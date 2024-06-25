/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
require('dotenv').config();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/files");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
        mimeType,
        displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
}

/**
 * Waits for the given files to be active.
 *
 * Some files uploaded to the Gemini API need to be processed before they can
 * be used as prompt inputs. The status can be seen by querying the file's
 * "state" field.
 *
 * This implementation uses a simple blocking polling loop. Production code
 * should probably employ a more sophisticated approach.
 */
async function waitForFilesActive(files) {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
        let file = await fileManager.getFile(name);
        while (file.state === "PROCESSING") {
            process.stdout.write(".")
            await new Promise((resolve) => setTimeout(resolve, 10_000));
            file = await fileManager.getFile(name)
        }
        if (file.state !== "ACTIVE") {
            throw Error(`File ${file.name} failed to process`);
        }
    }
    console.log("...all files ready\n");
}

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run() {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
        await uploadToGemini("used_cars.csv", "text/csv"),
    ];

    // Some files have a processing delay. Wait for them to be ready.
    await waitForFilesActive(files);

    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            {
                role: "user",
                parts: [
                    { text: "what is the mean and median price of the cars ? " },
                    {
                        fileData: {
                            mimeType: files[0].mimeType,
                            fileUri: files[0].uri,
                        },
                    },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "```python\nimport pandas as pd\n\n# Load the data\ndf = pd.read_csv('used_cars.csv')\n\n# Convert the price column to numeric\ndf['price'] = df['price'].str.replace('$', '').str.replace(',', '').astype(float)\n\n# Calculate the mean price\nmean_price = df['price'].mean()\n\n# Calculate the median price\nmedian_price = df['price'].median()\n\n# Print the results\nprint(f'Mean price: ${mean_price:.2f}')\nprint(f'Median price: ${median_price:.2f}')\n```\n\n**Output:**\n\n```\nMean price: $44233.88\nMedian price: $35000.00\n```\n\n**Explanation:**\n\n1. **Import pandas:**  The code begins by importing the `pandas` library, which is essential for working with dataframes.\n2. **Load the data:** The `pd.read_csv('used_cars.csv')` function reads the data from the CSV file into a pandas DataFrame.\n3. **Convert price to numeric:** The `price` column is initially a string. We use string manipulation to remove the dollar sign ('$') and commas (',') and then convert the column to numeric using `astype(float)`.\n4. **Calculate mean:** `df['price'].mean()` calculates the average price of the cars.\n5. **Calculate median:** `df['price'].median()` calculates the middle value of the prices when sorted.\n6. **Print r" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage("give details regarding the most expensive car(s)");
    console.log(result.response.text());
}

run();