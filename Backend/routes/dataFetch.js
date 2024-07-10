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
    port: PGPORT
});

// This is the route /fetchData :
// For retreiving an overview detail of all cars - will return basic car overview (not tyre,imperfection)
router.get("/", async (req, res) => {
    const client = await pool.connect();
    const query = `
    SELECT 
        c.*,
        array_agg(DISTINCT u.image_url) AS image_urls 
        FROM car c
        LEFT JOIN url u ON c.car_id = u.car_id 
        GROUP BY c.car_id
    `
    try {
        const carData = await client.query(query);
        if (carData.rows.length === 0)
            return res.status(200).json({ success: false, error: 'Car details could not be retrieved' })
        res.status(200).json({ success: true, data: carData.rows });
    } catch (error) {
        console.log("Error retrieving data: ", error);
        res.status(500).json({ success: false, error: 'An error occurred while fetching car data. Please try again.' });
    } finally {
        client.release();
    }
});

// For retreving full car details of a specific car with id - returns car,url,tyre,imperfection details
router.route("/:id").get(async (req, res) => {
    const query = `
            SELECT 
                c.*, 
                array_agg(DISTINCT u.image_url) AS image_urls,
                json_build_object(
                    'left_front', t.left_front, 
                    'left_rear', t.left_rear,
                    'right_front', t.right_front,
                    'right_rear', t.right_rear
                ) AS tyre_details,
                json_agg(json_build_object(
                    'location', i.imperfection_location, 
                    'description', i.imperfection_description
                )) AS imperfections
            FROM car c
            LEFT JOIN url u ON c.car_id = u.car_id
            LEFT JOIN tyre t ON c.car_id = t.car_id
            LEFT JOIN imperfection i ON c.car_id = i.car_id
            WHERE c.car_id = $1
            GROUP BY c.car_id, t.left_front, t.left_rear, t.right_front, t.right_rear
        `;
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
