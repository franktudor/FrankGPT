const axios = require('axios');

const BASE_URL = 'https://api.openai.com/v1';
const GPT_3_5_TURBO = 'gpt-3.5-turbo';

const getGPTResponse = async (prompt, apiKey, selectedModel) => {
    if (!apiKey) {
        throw new Error('No API key provided. Please set your API key.');
    }

    const isGPT35Turbo = selectedModel === GPT_3_5_TURBO;
    const url = isGPT35Turbo
        ? `${BASE_URL}/chat/completions`
        : `${BASE_URL}/engines/${selectedModel}/completions`;

    const requestData = isGPT35Turbo
        ? { model: selectedModel, messages: [{ role: "user", content: prompt }], temperature: 0.7 }
        : { prompt, max_tokens: 150 };

    try {
        const response = await axios.post(url, requestData, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });

        return isGPT35Turbo
            ? extractResponseFromTurbo(response)
            : response.data.choices[0].text.trim();
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        // Further error handling...
    }
};

const extractResponseFromTurbo = (response) => {
    const assistantResponse = response.data.choices.find(choice => choice.message.role === 'assistant');
    return assistantResponse?.message?.content.trim() || '';
};

module.exports = { getGPTResponse };
