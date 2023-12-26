const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');
const modelSelector = require('./model-selector');

// Global variable to store the last ChatGPT response
let lastGPTResponse = ''; // New global variable to store the last response

function activate(context) {
    console.log('FrankGPT extension is now active.');

    // Ensure globalState includes an update method
    if (!context.globalState.update) {
        context.globalState.update = (key, value) => {
            return new Promise((resolve, reject) => {
                try {
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        };
    }

    // Function to create a webview panel
    function createWebviewPanel(context) {
        const panel = vscode.window.createWebviewPanel(
            'chatGPTResponse', // Identifies the type of the webview. Used internally
            'ChatGPT Response', // Title of the panel displayed to the user
            vscode.ViewColumn.One, // Editor column to show the new webview panel in.
            {} // Webview options.
        );
    
        context.subscriptions.push(panel);
        return panel;
    }

    // Function to format content for the webview
    function getWebviewContent(response) {
        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ChatGPT Response</title>
            </head>
            <body>
                <p>${response}</p>
            </body>
            </html>`;
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
            apiKey = context.globalState.get('openaiApiKey');

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
                lastGPTResponse = gptResponse; // Store the response
                const panel = createWebviewPanel(context);
                panel.webview.html = getWebviewContent(gptResponse);
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
            lastGPTResponse = gptResponse; // Store the response
            // You might want to open the webview here as well
        } catch (error) {
            vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
        }
    });
    context.subscriptions.push(analyzeCodeCommand);

    // New command to open the webview panel with the last ChatGPT response
    let openWebviewCommand = vscode.commands.registerCommand('frankgpt.openWebview', () => {
        const panel = createWebviewPanel(context);
        panel.webview.html = getWebviewContent(lastGPTResponse); // Display the stored response
    });
    context.subscriptions.push(openWebviewCommand);
}

function deactivate(context) {
    apiKeyManager.clearApiKey(context);
    console.log('FrankGPT extension has been deactivated and API key cleared.');
}

module.exports = {
    activate,
    deactivate
};
