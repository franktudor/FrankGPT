const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Congratulations, your extension "frankgpt" is now active!');

    // Command for the original hello world example
    let disposableHelloWorld = vscode.commands.registerCommand('frankgpt.helloWorld', function () {
        vscode.window.showInformationMessage('Hello World from FrankGPT!');
    });

    context.subscriptions.push(disposableHelloWorld);

    // Command for ChatGPT interaction
    let disposableChatGPT = vscode.commands.registerCommand('frankgpt.askGPT', async () => {
        const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
        if (userInput) {
            try {
                const gptResponse = await chatGPT.getGPTResponse(userInput); // Using your ChatGPT API function
                vscode.window.showInformationMessage(gptResponse);
            } catch (error) {
                vscode.window.showErrorMessage('Error communicating with ChatGPT: ' + error);
            }
        }
    });
    // Command to set API key
    let setKeyCommand = vscode.commands.registerCommand('frankgpt.setApiKey', function () {
        apiKeyManager.setApiKey();
    });

    // Command to clear API key
    let clearKeyCommand = vscode.commands.registerCommand('frankgpt.clearApiKey', function () {
        apiKeyManager.clearApiKey();
    });

    context.subscriptions.push(disposableChatGPT, setKeyCommand, clearKeyCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
