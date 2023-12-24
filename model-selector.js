const vscode = require('vscode');

const MODELS = {
    ada: {
        name: 'text-ada-001',
        description: 'Ada (Fast and cost-effective for basic tasks like grammar and spelling corrections. Less nuanced understanding.)'
    },
    babbage: {
        name: 'text-babbage-001',
        description: 'Babbage (Balanced for straightforward tasks and semantic search ranking. Good for simple classification.)'
    },
    curie: {
        name: 'text-curie-001',
        description: 'Curie (Powerful and fast for nuanced tasks such as sentiment classification, summarization, and question answering.)'
    },
    davinci: {
        name: 'text-davinci-003',
        description: 'Davinci (Highest quality and most capable. Ideal for complex tasks requiring deep understanding and creative content generation.)'
    },
    gpt35: {
        name: 'gpt-3.5-turbo',
        description: 'GPT-3.5 Turbo (Cost-effective for advanced tasks. Optimized for chat, suitable for interactive applications requiring conversational AI.)'
    } // Ensure that this closing brace is correctly placed
};

async function selectModel(context) {
    const modelItems = Object.keys(MODELS).map(key => {
        return {
            label: key.charAt(0).toUpperCase() + key.slice(1),
            detail: MODELS[key].description,
            modelId: MODELS[key].name
        };
    });

    const selected = await vscode.window.showQuickPick(modelItems, {
        placeHolder: 'Select an OpenAI model',
        ignoreFocusOut: true
    });

    if (selected) {
        context.globalState.update('selectedOpenAIModel', selected.modelId);
        vscode.window.showInformationMessage(`Selected model: ${selected.label}`);
    }
}

module.exports = {
    selectModel
};
