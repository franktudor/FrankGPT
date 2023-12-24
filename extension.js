const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');
const modelSelector = require('./model-selector');
const frankgptModule = require('./help-queries-code-assist');

function activate(context) {
    console.log('Congratulations, your extension "frankgpt" is now active!');

    // Register general and specific commands
    registerGeneralCommands(context);
    registerChatGPTCommands(context);
}

function registerGeneralCommands(context) {
    // Hello World Command
    let disposableHelloWorld = vscode.commands.registerCommand('frankgpt.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from FrankGPT!');
    });
    context.subscriptions.push(disposableHelloWorld);

    // Model Selector Command
    let modelSelectorDisposable = vscode.commands.registerCommand('frankgpt.selectModel', async () => {
        await modelSelector.selectModel(context);
    });
    context.subscriptions.push(modelSelectorDisposable);

    // API Key Commands
    registerApiKeyCommands(context);
}

function registerChatGPTCommands(context) {
    // FrankGPT Query Command
    let disposableAskGPT = vscode.commands.registerCommand('frankgpt.askGPT', frankgptModule.askGPT);
    context.subscriptions.push(disposableAskGPT);
}

function registerApiKeyCommands(context) {
    // Set API Key Command
    let setKeyDisposable = vscode.commands.registerCommand('frankgpt.setApiKey', async () => {
        // Implementation for setting API key
    });

    // Clear API Key Command
    let clearKeyDisposable = vscode.commands.registerCommand('frankgpt.clearApiKey', async () => {
        // Implementation for clearing API key
    });

    context.subscriptions.push(setKeyDisposable, clearKeyDisposable);
}

function deactivate() {
    // Cleanup tasks when the extension is deactivated
}

module.exports = {
    activate,
    deactivate
};
