const vscode = require('vscode');

const MODELS = {
    ada: {
        name: 'text-ada-001',
        description: 'Ada (Cost-effective for basic tasks)'
    },
    babbage: {
        name: 'text-babbage-001',
        description: 'Babbage (Moderately priced, good for general tasks)'
    },
    curie: {
        name: 'text-curie-001',
        description: 'Curie (Higher quality, more expensive)'
    },
    davinci: {
        name: 'text-davinci-003',
        description: 'Davinci (Highest quality, most expensive)'
    },
    gpt35: {
        name: 'gpt-3.5-turbo',
        description: 'GPT-3.5 Turbo (Cost-effective for advanced tasks)'
    }
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
