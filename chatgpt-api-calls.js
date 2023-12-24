const axios = require('axios');

const getGPTResponse = async (prompt, apiKey, engine = 'text-ada-001') => {
    try {
        const response = await axios.post(`https://api.openai.com/v1/engines/${engine}/completions`, {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`  // Use the passed API key
            }
        });
        return response.data.choices[0].text.trim();
    } catch (error) {
        // Error handling remains the same...
    }
};

module.exports = {
    getGPTResponse
};
