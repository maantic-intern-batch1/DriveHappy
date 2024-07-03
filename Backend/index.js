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

// AWS S3 credentials
let { ACCESS_KEYID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME } = process.env

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

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

app.get('/s3URL', async (req, res) => {
    const url = await generateUploadURL();
    res.json({ ['url']: url });
});

app.post('/upload', (req, res) => {
    console.log(req.body);
    res.send('Hello World')
})



app.get("/", (req, res) => {
    res.send("Hello World")
})
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})