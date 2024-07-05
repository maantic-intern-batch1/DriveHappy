require("dotenv").config();

// For generating text from text : 
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// async function run() {
//     const prompt = "Write a story about a AI and magic"

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
// }

// run();

// For generating text from image and text : 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const prompt = fs.readFileSync('car_analysis_prompt.txt', 'utf8');
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType
        },
    };
}

async function run() {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel(
        { model: "gemini-1.5-pro", generationConfig: { response_mime_type: "application/json" } }
    );

    const imageParts = [
        fileToGenerativePart("nexon1.webp", "image/webp"),
        fileToGenerativePart("nexon2.webp", "image/webp"),
        fileToGenerativePart("nexon3.webp", "image/webp"),
        fileToGenerativePart("nexon4.webp", "image/webp"),
        fileToGenerativePart("nexon5.webp", "image/webp"),
        fileToGenerativePart("nexon6.webp", "image/webp"),
        fileToGenerativePart("nexon7.webp", "image/webp"),
        fileToGenerativePart("nexon8.webp", "image/webp"),
        fileToGenerativePart("nexon9.webp", "image/webp"),
        fileToGenerativePart("nexon10.webp", "image/webp"),
        fileToGenerativePart("nexon11.webp", "image/webp"),
        fileToGenerativePart("nexon12.webp", "image/webp"),
        fileToGenerativePart("nexon13.webp", "image/webp"),
        fileToGenerativePart("nexon14.webp", "image/webp"),
        fileToGenerativePart("nexon15.webp", "image/webp"),
        fileToGenerativePart("nexon16.webp", "image/webp"),
    ];
    // console.log(imageParts);
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    // console.log(response);
    const text = response.text();
    // console.log(text);
    console.log(JSON.parse(text));
}

run();