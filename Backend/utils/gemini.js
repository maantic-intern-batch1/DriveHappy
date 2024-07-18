require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const prompt = fs.readFileSync('car_analysis_prompt.txt', 'utf8');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function bufferToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        },
    };
}

const sendImagesToGemini = async (files) => {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", generationConfig: { response_mime_type: "application/json" } });
    const imageParts = files.map(file => bufferToGenerativePart(file.buffer, file.mimetype));
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = await response.text();
    const json = await JSON.parse(text); // Adjust according to the actual response format
    return json
};

module.exports = {
    sendImagesToGemini
}