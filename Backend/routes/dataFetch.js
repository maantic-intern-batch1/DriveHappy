require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: PGPORT,
    // ssl: false // Disable SSL
});

// This is the route /fetchData :
// For retreiving an overview detail of all cars - will return basic car overview (not tyre,imperfection)
router.get("/", async (req, res) => {
    const client = await pool.connect();
    let { make, fuel, price } = req.query;

    let query = `
    SELECT 
        c.*,
        array_agg(DISTINCT u.image_url) AS image_urls 
    FROM car c
    LEFT JOIN url u ON c.car_id = u.car_id 
    WHERE 1=1
    `;

    const queryParams = [];

    if (make && make !== 'any') {
        queryParams.push(make);
        query += ` AND LOWER(c.make) = LOWER($${queryParams.length})`;
    }

    if (fuel && fuel !== 'any') {
        queryParams.push(`%${fuel}%`);
        query += ` AND c.fueltype ILIKE $${queryParams.length}`;
    }

    if (price && price !== 'any') {
        let minPrice, maxPrice;
        switch (price) {
            case 'price2':
                minPrice = 100000; // 1 Lakh
                maxPrice = 400000; // 4 Lakhs
                break;
            case 'price3':
                minPrice = 400000; // 4 Lakhs
                maxPrice = 800000; // 8 Lakhs
                break;
            case 'price4':
                minPrice = 800000; // 8 Lakhs
                maxPrice = 1500000; // 15 Lakhs
                break;
            case 'price5':
                minPrice = 1500000; // 15 Lakhs
                maxPrice = 9999999999; // A very high number instead of Number.MAX_SAFE_INTEGER
                break;
            default:
                minPrice = 0;
                maxPrice = 9999999999; // A very high number
        }
        queryParams.push(minPrice, maxPrice);
        query += ` AND c.price::numeric BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
    }

    query += ` GROUP BY c.car_id`;

    try {
        const carData = await client.query(query, queryParams);
        if (carData.rows.length === 0) {
            return res.status(200).json({ success: false, error: 'No cars found matching the criteria' });
        }
        res.status(200).json({ success: true, data: carData.rows });
    } catch (error) {
        console.error("Error retrieving data: ", error);
        res.status(500).json({ success: false, error: 'An error occurred while fetching car data. Please try again.' });
    } finally {
        client.release();
    }
});

// For retreving full car details of a specific car with id - returns car,url,tyre,imperfection details
router.route("/:id").get(async (req, res) => {
    const query = `
    WITH car_data AS (
    SELECT
        c.*,
        ARRAY(
            SELECT u.image_url
            FROM url u
            WHERE u.car_id = c.car_id
        ) AS image_urls,
        json_build_object(
            'left_front', tyre.left_front,
            'right_front', tyre.right_front,
            'left_rear', tyre.left_rear,
            'right_rear', tyre.right_rear
        ) AS tyre_details,
        ARRAY(
            SELECT json_build_object(
                'location', i.imperfection_location,
                'description', i.imperfection_description
            ) AS imperfections
            FROM imperfection i
            WHERE i.car_id = c.car_id
        ) AS imperfections
    FROM car c
    LEFT JOIN tyre ON tyre.car_id = c.car_id
    WHERE c.car_id = $1
)
SELECT * FROM car_data;
    `
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ success: false, error: 'Invalid car ID' });
    }

    const client = await pool.connect();
    try {
        const carData = await pool.query(query, [id]);
        if (carData.rows.length === 0) {
            return res.status(404).json({ success: false, error: 'Car not found' });
        }
        res.status(200).json({ success: true, data: carData.rows[0] });
    }
    catch (error) {
        console.log("Error retrieving data: ", error);
        res.status(500).json({ success: false, error: 'An error occurred while fetching car data. Please try again.' });
    } finally {
        client.release();
    }
})
module.exports = router;
