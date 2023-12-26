const axios = require('axios');

const getGPTResponse = async (/** @type {any} */ prompt, /** @type {any} */ apiKey, /** @type {string} */ selectedModel) => {
    if (!apiKey) {
        throw new Error('No API key provided. Please set your API key.');
    }

    try {
        let url, requestData;
        if (selectedModel === 'gpt-3.5-turbo') {
            url = `https://api.openai.com/v1/chat/completions`;
            requestData = {
                model: selectedModel,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            };
        } else {
            url = `https://api.openai.com/v1/engines/${selectedModel}/completions`;
            requestData = {
                prompt: prompt,
                max_tokens: 150
            };
        }

        const response = await axios.post(url, requestData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        if (selectedModel === 'gpt-3.5-turbo') {
            const assistantResponse = response.data.choices.find(choice => choice.message.role === 'assistant');
            if (assistantResponse && assistantResponse.message) {
                return assistantResponse.message.content.trim();
            } else {
                return ''; // Or handle the absence of an assistant response appropriately
            }
        } else {
            return response.data.choices[0].text.trim();
        }
        
    } catch (error) {
        // [existing error handling code]
    }
};

module.exports = {
    getGPTResponse
};
