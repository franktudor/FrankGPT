const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');

function activate(context) {
    console.log('Congratulations, your extension "frankgpt" is now active!');

    let disposableHelloWorld = vscode.commands.registerCommand('frankgpt.helloWorld', function () {
        vscode.window.showInformationMessage('Hello World from FrankGPT!');
    });
    context.subscriptions.push(disposableHelloWorld);

    let disposableChatGPT = vscode.commands.registerCommand('frankgpt.askGPT', async () => {
        const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
        if (userInput) {
            const apiKey = context.globalState.get('openaiApiKey');
            try {
                const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey);
                vscode.window.showInformationMessage(gptResponse);
            } catch (error) {
                vscode.window.showErrorMessage('Error communicating with ChatGPT: ' + error);
            }
        }
    });
    context.subscriptions.push(disposableChatGPT);

    let setKeyCommand = vscode.commands.registerCommand('frankgpt.setApiKey', function () {
        apiKeyManager.setApiKey(context);
    });
    context.subscriptions.push(setKeyCommand);

    let clearKeyCommand = vscode.commands.registerCommand('frankgpt.clearApiKey', function () {
        apiKeyManager.clearApiKey(context);
    });
    context.subscriptions.push(clearKeyCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};