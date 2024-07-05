require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const promisify = require('util').promisify;
const randomBytes = promisify(crypto.randomBytes);
const PORT = process.env.PORT || 3000
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const prompt = fs.readFileSync('car_analysis_prompt.txt', 'utf8');
// Access your API key as an environment variable (see "Set up your API key" above)
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
    // const json = await response.json();
    // return json;
    // console.log(prompt);
    const text = await response.text();
    // console.log(text);
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
async function generateUploadURL() // provides the url for the image (for putting)
{
    const rawBytes = await randomBytes(16); // generates 16 random bytes
    const imageName = rawBytes.toString('hex'); // converting the bytes into hexadecimal
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: imageName,
        // Expires: 60,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
    // return null;
}

// app.get('/s3URL', async (req, res) => {
//     const url = await generateUploadURL();
//     res.json({ ['url']: url });
// });

app.post("/upload-images", upload.array('images'), async (req, res) => {
    try {
        const files = req.files;
        const carDetails = await sendImagesToGemini(files);
        console.log("post : ", carDetails);
        const carId = 1;
        res.status(200).json({ success: true, carId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'An error occurred' });
    }
})

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})