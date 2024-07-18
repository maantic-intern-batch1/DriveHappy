require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};

// connecting the routers 
const fetchData = require("./routes/dataFetch");
const uploadData = require("./routes/uploadData");

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/fetchData", fetchData);
app.use("/uploadData", uploadData);

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})