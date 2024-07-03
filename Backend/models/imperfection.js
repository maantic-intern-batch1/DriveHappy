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
const createImperfectionTable = async () => {
    const query = `
    CREATE TABLE imperfection (
    imperfection_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES car(car_id),
    imperfection_location VARCHAR(255), 
    imperfection_description VARCHAR(255)
    );
  `;

    try {
        // Create the url table
        await pool.query(query);
        console.log("Imperfection table created successfully.");
    } catch (err) {
        console.error("Error creating car table:", err);
    }
};

module.exports = { createImperfectionTable };