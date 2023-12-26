///analysis start
const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');
const modelSelector = require('./model-selector');

/**
 * @param {{ subscriptions: vscode.Disposable[]; globalState: { get: (arg0: string) => any; update: (arg0: string, arg1: any) => Thenable<void>; }; }} context
 */
function activate(context) {
    console.log('FrankGPT extension is now active.');

    // Ensure globalState includes an update method
    if (!context.globalState.update) {
        // eslint-disable-next-line no-unused-vars
        context.globalState.update = (key, value) => {
            // Implement the logic to update the global state here
            // Return a Thenable<void>
            return new Promise((resolve, reject) => {
                try {
                    // Asynchronous state update logic goes here.
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        };
    }

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
            apiKeyManager.setApiKey(context);
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

    // Command for analyzing code
    let analyzeCodeCommand = vscode.commands.registerCommand('frankgpt.analyzeCode', async () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No code found. Open a file with code to analyze.');
            return;
        }

        let text = editor.document.getText();
        let lines = text.split('\n');
        let startIndex = -1, endIndex = -1;

        // Find start and end indices of the analysis block
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('///analysis start') && startIndex === -1) {
                startIndex = i;
            } else if (lines[i].includes('///analysis end') && endIndex === -1) {
                endIndex = i;
                break;
            }
        }

        if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
            vscode.window.showInformationMessage('Analysis block not properly defined.');
            return;
        }

        // Extract the code block
        let selectedCode = lines.slice(startIndex + 1, endIndex).join('\n');

        let apiKey = context.globalState.get('openaiApiKey');
        if (!apiKey) {
            apiKeyManager.setApiKey(context);
            apiKey = context.globalState.get('openaiApiKey');
            if (!apiKey) {
                vscode.window.showErrorMessage('FrankGPT: No API key set. Please set your API key to use this feature.');
                return;
            }
        }

        try {
            const selectedModel = context.globalState.get('selectedOpenAIModel');
            const gptResponse = await chatGPT.getGPTResponse(selectedCode, apiKey, selectedModel);
            vscode.window.showInformationMessage(gptResponse);
        } catch (error) {
            vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
        }
    });
    context.subscriptions.push(analyzeCodeCommand);
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
///analysis end
