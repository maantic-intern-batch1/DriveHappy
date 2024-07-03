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
const createUrlTable = async () => {
    const query = `
    CREATE TABLE url (
    url_id SERIAL PRIMARY KEY,
    car_id INT REFERENCES car(car_id),
    image_url VARCHAR(255)
    );
  `;

    try {
        // Create the url table
        await pool.query(query);
        console.log("Url table created successfully.");
    } catch (err) {
        console.error("Error creating car table:", err);
    }
};

module.exports = { createUrlTable };