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
const createCarTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS car (
      Car_id SERIAL PRIMARY KEY,
      Make VARCHAR(255),
      Model VARCHAR(255),
      Year INT,
      Price DECIMAL,
      Distance DECIMAL,
      CarCondition VARCHAR(255),
      Repainted_Parts VARCHAR(255),
      Perfect_Parts VARCHAR(255),
      Repair_cost DECIMAL
    );
  `;

    try {
        // Create the car table
        await pool.query(query);
        console.log("Car table created successfully.");
    } catch (err) {
        console.error("Error creating car table:", err);
    }
};

module.exports = { createCarTable };