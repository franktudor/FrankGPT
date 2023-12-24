const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');
const modelSelector = require('./model-selector');

function activate(context) {
    console.log('FrankGPT extension is now active.');

    // Command for displaying a simple message
    let disposableHelloWorld = vscode.commands.registerCommand('frankgpt.helloWorld', () => {
        vscode.window.showInformationMessage('FrankGPT functions yay!');
    });
    context.subscriptions.push(disposableHelloWorld);

    // Command for selecting the GPT model
    let selectModelCommand = vscode.commands.registerCommand('frankgpt.selectModel', () => {
        modelSelector.selectModel(context);
    });
    context.subscriptions.push(selectModelCommand);

    // Command for interacting with ChatGPT
    let askChatGPT = vscode.commands.registerCommand('frankgpt.askGPT', async () => {
        let apiKey = context.globalState.get('openaiApiKey');

        if (!apiKey) {
            await apiKeyManager.setApiKey(context);
            apiKey = context.globalState.get('openaiApiKey'); // Re-fetch the API key

            if (!apiKey) {
                vscode.window.showErrorMessage('FrankGPT: No API key set. Please set your API key to use this feature.');
                return;
            }
        }
        const selectedModel = context.globalState.get('selectedOpenAIModel');
        const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
        if (userInput) {
            try {
                const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey, selectedModel);
                vscode.window.showInformationMessage(gptResponse);
            } catch (error) {
                vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
            }
        }
    });
    context.subscriptions.push(askChatGPT);

    // Command to set API key
    let setKeyCommand = vscode.commands.registerCommand('frankgpt.setApiKey', () => {
        apiKeyManager.setApiKey(context);
    });
    context.subscriptions.push(setKeyCommand);

    // Command to clear API key
    let clearKeyCommand = vscode.commands.registerCommand('frankgpt.clearApiKey', () => {
        apiKeyManager.clearApiKey(context);
    });
    context.subscriptions.push(clearKeyCommand);
}

function deactivate(context) {
    // Clear the API key from the global state
    apiKeyManager.clearApiKey(context);
    console.log('FrankGPT extension has been deactivated and API key cleared.');
}

module.exports = {
    activate,
    deactivate
};
