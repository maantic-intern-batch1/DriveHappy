require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const promisify = require('util').promisify;
const randomBytes = promisify(crypto.randomBytes);
const PORT = process.env.PORT || 3000
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const prompt = fs.readFileSync('car_analysis_prompt.txt', 'utf8');
const { Pool } = require('pg');
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: PGPORT,
    ssl: false // Disable SSL
});

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// AWS S3 credentials
let { ACCESS_KEYID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME } = process.env

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};

// connecting the routers 
const fetchData = require("./routes/dataFetch");
// const uploadData = require("./routes/uploadData");
// app.use(multer().array)
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))


const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });

function bufferToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        },
    };
}

const sendImagesToGemini = async (files) => {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: { response_mime_type: "application/json" } });
    const imageParts = files.map(file => bufferToGenerativePart(file.buffer, file.mimetype));
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
    const json = await JSON.parse(text); // Adjust according to the actual response format
    return json
};

const s3Client = new S3Client(
    {
        region: REGION,
        credentials: {
            accessKeyId: ACCESS_KEYID,
            secretAccessKey: SECRET_ACCESS_KEY
        }
    }
);

async function uploadImageToS3(file) {
    const rawBytes = await randomBytes(16); // generates 16 random bytes
    const imageName = rawBytes.toString('hex'); // converting the bytes into hexadecimal
    const key = `/used-car-images/${imageName}`; // Constructing the key with the desired folder structure
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    });
    await s3Client.send(command);
    return key; // Return the key of the uploaded image
}
const parseNumeric = (value) => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? null : parsedValue;
};
const storeCarDetails = async (carDetails, imageUrls) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const carResult = await client.query(
            `INSERT INTO car (Make, Model, Year, Price, Distance, CarCondition, Repainted_Parts, Perfect_Parts, Repair_cost,FuelType)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING Car_id`,
            [
                carDetails.OtherDetails.MakeName,
                carDetails.OtherDetails.ModelName,
                parseNumeric(carDetails.OtherDetails.Year),
                parseNumeric(carDetails.OtherDetails.PriceEstimate),
                parseNumeric(carDetails.OtherDetails.DistanceTravelled),
                carDetails.OtherDetails.CarCondition,
                carDetails.OtherDetails.RepaintedParts,
                carDetails.OtherDetails.PerfectParts,
                parseNumeric(carDetails.OtherDetails.ApproximateCostOfRepair),
                carDetails.OtherDetails.FuelType
            ]
        );

        const carId = carResult.rows[0].car_id;

        for (const [location, description] of Object.entries(carDetails.Imperfections)) {
            await client.query(
                `INSERT INTO imperfection (car_id, imperfection_location, imperfection_description)
         VALUES ($1, $2, $3)`,
                [carId, location, description]
            );
        }

        await client.query(
            `INSERT INTO tyre (car_id, left_front, left_rear, right_front, right_rear)
            VALUES ($1, $2, $3, $4, $5)`,
            [
                carId,
                parseNumeric(carDetails.TyreDetails.LeftFrontTyreLifeRemaining),
                parseNumeric(carDetails.TyreDetails.LeftRearTyreLifeRemaining),
                parseNumeric(carDetails.TyreDetails.RightFrontTyreLifeRemaining),
                parseNumeric(carDetails.TyreDetails.RightRearTyreLifeRemaining),
            ]
        );

        for (const url of imageUrls) {
            await client.query(
                `INSERT INTO url (car_id, image_url)
         VALUES ($1, $2)`,
                [carId, url]
            );
        }

        await client.query('COMMIT');
        return carId;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};
app.use("/fetchData", fetchData);
// app.use("/uploadData", uploadData);
app.post("/upload-images", upload.array('images'), async (req, res) => {
    try {
        const files = req.files;
        const carDetails = await sendImagesToGemini(files);

        const folderName = 'internb1';
        const uploadPromises = files.map(file => uploadImageToS3(file));
        const uploadedKeys = await Promise.all(uploadPromises);

        const baseUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/`;
        const fullUrls = uploadedKeys.map(key => `${baseUrl}${key}`);

        const carId = await storeCarDetails(carDetails, fullUrls);

        // console.log('Car Details:', carDetails);
        // console.log('Uploaded Keys:', fullUrls);

        res.status(200).json({ success: true, carId, fullUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ success: false, error: 'An error occurred' });
    }
});

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})