require('dotenv').config()
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
const createTyreTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS tyre (
      tyre_id SERIAL PRIMARY KEY,
      car_id INT REFERENCES car(car_id),
      left_front DECIMAL, 
      left_rear DECIMAL, 
      right_front DECIMAL, 
      right_rear DECIMAL
    );
  `;

    try {
        // Create the car table
        await pool.query(query);
        console.log("Tyre table created successfully.");
    } catch (err) {
        console.error("Error creating car table:", err);
    }
};

module.exports = { createTyreTable };