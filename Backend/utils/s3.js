require('dotenv').config()
const crypto = require('crypto');
const promisify = require('util').promisify;
const randomBytes = promisify(crypto.randomBytes);
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
let { ACCESS_KEYID, SECRET_ACCESS_KEY, REGION, BUCKET_NAME } = process.env

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
    const key = `used-car-images/${imageName}`; // Constructing the key with the desired folder structure
    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype
    });
    await s3Client.send(command);
    return key; // Return the key of the uploaded image
}
module.exports = { uploadImageToS3 }