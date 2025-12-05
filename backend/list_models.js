import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    try {
        console.log('Listing available models...');
        console.log(`Using API Key: ${API_KEY ? API_KEY.substring(0, 5) + '...' : 'NOT FOUND'}`);

        const response = await axios.get(API_URL);

        console.log('\nAvailable Models:');
        const models = response.data.models;

        if (models && models.length > 0) {
            models.forEach(model => {
                // Filter for generateContent models
                if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                    console.log(`- ${model.name} (${model.displayName})`);
                }
            });
        } else {
            console.log('No models found.');
        }

    } catch (error) {
        console.error('Error listing models:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
}

listModels();
