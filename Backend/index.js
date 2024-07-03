require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const promisify = require('util').promisify;
const randomBytes = promisify(crypto.randomBytes);

/*             Database Schemas                  */
const { createCarTable } = require('./models/car.js');
const { createUrlTable } = require('./models/url.js');
const { createImperfectionTable } = require('./models/imperfection.js');

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




const initializeDatabase = async () => {
    await createImperfectionTable();
};

initializeDatabase()
    .then(() => {
        console.log('Database initialized successfully.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error initializing database:', err);
        process.exit(1);
    });


app.get("/", (req, res) => {
    res.send("Hello World")
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})