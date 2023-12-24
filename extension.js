const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');
const modelSelector = require('./model-selector');

function activate(context) {
    console.log('Congratulations, your extension "frankgpt" is now active!');

    // Register commands
    registerHelloWorldCommand(context);
    registerChatGPTCommand(context);
    registerApiKeyCommands(context);
    registerModelSelectorCommand(context);
}

async function registerHelloWorldCommand(context) {
    let disposable = vscode.commands.registerCommand('frankgpt.helloWorld', async () => {
        vscode.window.showInformationMessage('Hello World from FrankGPT!');
    });
    context.subscriptions.push(disposable);
}

async function registerChatGPTCommand(context) {
    let disposable = vscode.commands.registerCommand('frankgpt.askGPT', async () => {
        const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
        if (userInput) {
            try {
                const apiKey = context.globalState.get('openaiApiKey');
                const selectedEngine = context.globalState.get('selectedOpenAIModel') || 'text-ada-001';  // Default to Ada if no model selected

                if (!apiKey) {
                    vscode.window.showErrorMessage('No API key set. Please set your OpenAI API key.');
                    return;
                }
                const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey, selectedEngine);
                vscode.window.showInformationMessage(gptResponse);
            } catch (error) {
                vscode.window.showErrorMessage('Error communicating with ChatGPT: ' + (error.message || error));
            }
        }
    });
    context.subscriptions.push(disposable);
}

async function registerApiKeyCommands(context) {
    let setKeyDisposable = vscode.commands.registerCommand('frankgpt.setApiKey', async () => {
        try {
            await apiKeyManager.setApiKey(context);
        } catch (error) {
            vscode.window.showErrorMessage('Error setting API key: ' + error.message);
        }
    });
    let clearKeyDisposable = vscode.commands.registerCommand('frankgpt.clearApiKey', async () => {
        try {
            await apiKeyManager.clearApiKey(context);
        } catch (error) {
            vscode.window.showErrorMessage('Error clearing API key: ' + error.message);
        }
    });
    context.subscriptions.push(setKeyDisposable, clearKeyDisposable);
}

async function registerModelSelectorCommand(context) {
    let modelSelectorDisposable = vscode.commands.registerCommand('frankgpt.selectModel', async () => {
        await modelSelector.selectModel(context);
    });
    context.subscriptions.push(modelSelectorDisposable);
}

function deactivate() {
    // Cleanup tasks when the extension is deactivated
}

module.exports = {
    activate,
    deactivate
};
