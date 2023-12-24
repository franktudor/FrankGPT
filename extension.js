const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');

function activate(context) {
    console.log('Congratulations, your extension "frankgpt" is now active!');

    registerHelloWorldCommand(context);
    registerChatGPTCommand(context);
    registerSetApiKeyCommand(context);
    registerClearApiKeyCommand(context);
}

function registerHelloWorldCommand(context) {
    let disposable = vscode.commands.registerCommand('frankgpt.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from FrankGPT!');
    });
    context.subscriptions.push(disposable);
}

async function registerChatGPTCommand(context) {
    let disposable = vscode.commands.registerCommand('frankgpt.askGPT', async () => {
        const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
        if (userInput) {
            try {
                const gptResponse = await chatGPT.getGPTResponse(userInput);
                vscode.window.showInformationMessage(gptResponse);
            } catch (error) {
                vscode.window.showErrorMessage('Error communicating with ChatGPT: ' + error);
            }
        }
    });
    context.subscriptions.push(disposable);
}

async function registerSetApiKeyCommand(context) {
    let disposable = vscode.commands.registerCommand('frankgpt.setApiKey', async () => {
        try {
            await apiKeyManager.setApiKey();
        } catch (error) {
            vscode.window.showErrorMessage('Error setting API key: ' + error.message);
        }
    });
    context.subscriptions.push(disposable);
}

async function registerClearApiKeyCommand(context) {
    let disposable = vscode.commands.registerCommand('frankgpt.clearApiKey', async () => {
        try {
            await apiKeyManager.clearApiKey();
        } catch (error) {
            vscode.window.showErrorMessage('Error clearing API key: ' + error.message);
        }
    });
    context.subscriptions.push(disposable);
}

function deactivate() {
    // Cleanup tasks when the extension is deactivated
}

module.exports = {
    activate,
    deactivate
};
