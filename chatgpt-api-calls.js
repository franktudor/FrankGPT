const axios = require('axios');

const getGPTResponse = async (prompt, apiKey, selectedModel) => {
    if (!apiKey) {
        throw new Error('No API key provided. Please set your API key.');
    }

    try {
        let url;
        if (selectedModel === 'gpt-3.5-turbo') {
            url = `https://api.openai.com/v1/chat/completions`; // Endpoint for GPT-3.5 Turbo
        } else {
            url = `https://api.openai.com/v1/engines/${selectedModel}/completions`; // Endpoint for other models
        }

        const response = await axios.post(url, {
            model: selectedModel,
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        if (error.response) {
            // Handle known HTTP errors
            switch (error.response.status) {
                case 400:
                    throw new Error('Bad Request: The server cannot process the request due to a client error. Check your input for correctness.');
                case 401:
                    throw new Error('Unauthorized: Your API key is invalid or not provided. Verify that your API key is correct.');
                case 403:
                    throw new Error('Forbidden: You do not have permission to access this resource with the provided API key.');
                case 404:
                    throw new Error('Not Found: The requested resource could not be found. Check the API endpoint and model name.');
                case 429:
                    if (error.response.data.error.includes('Rate limit reached')) {
                        throw new Error('Rate Limit Exceeded: You have hit your assigned rate limit. Pace your requests.');
                    } else if (error.response.data.error.includes('You exceeded your current quota')) {
                        throw new Error('Quota Exceeded: You have exceeded your current quota. Check your plan and billing details.');
                    } else {
                        throw new Error('Server Overload: The engine is currently overloaded. Please try again later.');
                    }
                case 500:
                    throw new Error('Internal Server Error: The server had an error while processing your request. Retry after a brief wait.');
                default:
                    throw new Error(`Unexpected Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            }
        } else if (error.request) {
            throw new Error('No response received: The request was made but no response was received. Check your network connection.');
        } else {
            throw new Error(`Request setup error: ${error.message}`);
        }
    }
};

module.exports = {
    getGPTResponse
};
