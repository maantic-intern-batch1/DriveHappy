const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});
const updateCarDetails = async (req, res) => {
    const carId = parseInt(req.params.id);
    const carDetails = req.body;

    try {
        await pool.query('BEGIN');

        // Update car details
        const carUpdateQuery = `
            UPDATE car SET
                Make = $1,
                Model = $2,
                Year = $3,
                Price = $4,
                Distance = $5,
                Fueltype = $6,
                CarCondition = $7,
                Repainted_Parts = $8,
                Perfect_Parts = $9,
                Repair_cost = $10
            WHERE Car_id = $11
        `;

        const carUpdateValues = [
            carDetails.make,
            carDetails.model,
            carDetails.year,
            carDetails.price,
            carDetails.distance,
            carDetails.fueltype,
            carDetails.carcondition,
            carDetails.repainted_parts,
            carDetails.perfect_parts,
            carDetails.repair_cost,
            carId
        ];

        await pool.query(carUpdateQuery, carUpdateValues);

        // Update imperfections
        if (carDetails.imperfections && Array.isArray(carDetails.imperfections)) {
            for (const imperfection of carDetails.imperfections) {
                const imperfectionUpdateQuery = `
                    UPDATE imperfection SET
                        imperfection_description = $1
                    WHERE car_id = $2 AND imperfection_location = $3
                `;

                const imperfectionUpdateValues = [
                    imperfection.description,
                    carId,
                    imperfection.location
                ];

                await pool.query(imperfectionUpdateQuery, imperfectionUpdateValues);
            }
        }

        // Update tyre details
        if (carDetails.tyre_details) {
            const tyreUpdateQuery = `
                UPDATE tyre SET
                    left_front = $1,
                    left_rear = $2,
                    right_front = $3,
                    right_rear = $4
                WHERE car_id = $5
            `;

            const tyreUpdateValues = [
                carDetails.tyre_details.left_front,
                carDetails.tyre_details.left_rear,
                carDetails.tyre_details.right_front,
                carDetails.tyre_details.right_rear,
                carId
            ];

            await pool.query(tyreUpdateQuery, tyreUpdateValues);
        }

        await pool.query('COMMIT');

        res.status(200).json({ success: true, message: 'Car details updated successfully' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error updating car details:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    updateCarDetails
};
