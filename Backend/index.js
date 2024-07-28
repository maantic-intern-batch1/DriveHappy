require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const resend = require('resend');
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
app.post('/send-email', async (req, res) => {
    const resendy = new resend.Resend(process.env.RESEND_API_KEY);
    const { phone, email, carDetails } = req.body;

    try {
        const data = await resendy.emails.send({
            from: process.env.FROM_EMAIL,
            to: process.env.TO_EMAIL,
            subject: 'New Interested Buyer',
            html: `
                A buyer is interested in ${carDetails.make} ${carDetails.model}.
                <p>Contact Details:
                    <ul>
                        <li>Mobile Number: ${phone}</li>
                        <li>Email: ${email}</li>
                    </ul>
                </p>
            `
        });
        return res.json({ success: true, message: "Email sent successfully" });
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error sending email" });
    }
});
app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})