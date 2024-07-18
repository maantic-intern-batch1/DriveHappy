require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Pool } = require('pg');
const { sendImagesToGemini } = require('../utils/gemini');
const { uploadImageToS3 } = require('../utils/s3');
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const storage = multer.memoryStorage(); // Use memory storage
const upload = multer({ storage: storage });

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: PGPORT
});

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

// for the requests with prefix /upload
router.post("/images", upload.array('images'), async (req, res) => {
    try {
        const files = req.files;
        const carDetails = await sendImagesToGemini(files);

        const uploadPromises = files.map(file => uploadImageToS3(file));
        const uploadedKeys = await Promise.all(uploadPromises);

        const baseUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/`;
        const fullUrls = uploadedKeys.map(key => `${baseUrl}${key}`);

        const carId = await storeCarDetails(carDetails, fullUrls);

        res.status(200).json({ success: true, carId, fullUrls });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ success: false, error: 'An error occurred' });
    }
});
module.exports = router;