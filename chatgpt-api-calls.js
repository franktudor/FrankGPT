const axios = require('axios');

const getGPTResponse = async (prompt, apiKey, selectedModel) => {
    if (!apiKey) {
        throw new Error('No API key provided. Please set your API key.');
    }

    try {
        const model = selectedModel || 'text-ada-001'; // Default to ADA if no model selected since it costs so little per request.

        const response = await axios.post(`https://api.openai.com/v1/engines/${model}/completions`, {
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
                    console.error('Bad Request:', error.response.data);
                    throw new Error('Bad Request. Please check your input.');
                case 401:
                    console.error('Unauthorized:', error.response.data);
                    throw new Error('Unauthorized. Check your API key.');
                case 403:
                    console.error('Forbidden:', error.response.data);
                    throw new Error('Forbidden. You do not have permission to access this resource.');
                case 429:
                    console.error('Rate Limit Exceeded:', error.response.data);
                    throw new Error('Rate limit exceeded. Please try again later.');
                default:
                    console.error('Error communicating with ChatGPT:', error.response.data);
                    throw new Error('An error occurred while communicating with the API.');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('No response from the server. Please check your network connection.');
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Error setting up request:', error.message);
            throw new Error('Error in setting up the API request.');
        }
    }
};

module.exports = {
    getGPTResponse
};
