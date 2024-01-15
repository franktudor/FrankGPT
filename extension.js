const vscode = require('vscode');
const chatGPT = require('./modules/chatgpt-api-calls');
const apiKeyManager = require('./modules/api-key-manager');
const modelSelector = require('./modules/model-selector');
const webviewManager = require('./modules/webview-manager');

let conversationHistory = {
    inputs: [],
    responses: []
};

function activate(context) {
    console.log('FrankGPT extension is now active.');

    registerCommand(context, 'helloWorld', displayHelloWorld);
    registerCommand(context, 'selectModel', () => modelSelector.selectModel(context));
    registerCommand(context, 'askGPT', () => handleAskGPT(context));
    registerCommand(context, 'setApiKey', () => apiKeyManager.setApiKey(context));
    registerCommand(context, 'clearApiKey', () => apiKeyManager.clearApiKey(context));
    registerCommand(context, 'analyzeCode', () => handleAnalyzeCode(context));
    registerCommand(context, 'openWebview', () => handleOpenWebview(context));
}

function deactivate(context) {
    apiKeyManager.clearApiKey(context);
    console.log('FrankGPT extension has been deactivated.');
}

function registerCommand(context, commandId, commandFunc) {
    const disposable = vscode.commands.registerCommand(commandId, commandFunc);
    context.subscriptions.push(disposable);
}

function displayHelloWorld() {
    vscode.window.showInformationMessage('FrankGPT functions yay!');
}

async function handleAskGPT(context) {
    const apiKey = await getApiKey(context);
    if (!apiKey) return;

    const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
    if (userInput) {
        try {
            const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey, context.globalState.get('selectedOpenAIModel'));
            conversationHistory.inputs.push(userInput);
            conversationHistory.responses.push(gptResponse);

            // Log the response to the console
            // console.log('GPT Response:', gptResponse);
            vscode.window.showInformationMessage('GPT Response:', gptResponse);

            // Ask the user if they want to open the response in a webview
            const openInWebview = await vscode.window.showInformationMessage(
                'Do you want to view the response in a more detailed view?',
                'Yes', 'No'
            );

            if (openInWebview === 'Yes') {
                const panel = webviewManager.createWebviewPanel(context);
                panel.webview.html = webviewManager.getWebviewContent(conversationHistory.inputs, conversationHistory.responses);
                setupMessageListener(panel, context);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
        }
    }
}

async function handleAnalyzeCode(context) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No code found. Open a file with code to analyze.');
        return;
    }

    const { startIndex, endIndex, lines } = findAnalysisBlock(editor.document.getText());
    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        vscode.window.showInformationMessage('Analysis block not properly defined.');
        return;
    }

    const selectedCode = lines.slice(startIndex + 1, endIndex).join('\n');
    try {
        const gptResponse = await chatGPT.getGPTResponse(selectedCode, await getApiKey(context), context.globalState.get('selectedOpenAIModel'));
        conversationHistory.inputs.push(selectedCode);
        conversationHistory.responses.push(gptResponse);
        // Consider showing response in a webview here as well
    } catch (error) {
        vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
    }
}

function handleOpenWebview(context) {
    const panel = webviewManager.createWebviewPanel(context);
    panel.webview.html = webviewManager.getWebviewContent(conversationHistory.inputs, conversationHistory.responses);
    setupMessageListener(panel, context);
}

function setupMessageListener(webviewPanel, context) {
    webviewPanel.webview.onDidReceiveMessage(
        async message => {
            switch (message.command) {
                case 'submitQuery':
                    await processQuery(message.text, context, webviewPanel);
                    break;
            }
        },
        undefined,
        context.subscriptions
    );
}

async function processQuery(userInput, context, webviewPanel) {
    const apiKey = await getApiKey(context);
    if (!apiKey) return;

    // Update conversation history with user input and a placeholder for the response
    conversationHistory.inputs.push(userInput);
    conversationHistory.responses.push("Generating response...");

    // Update the webview immediately with the user input and loading state
    if (webviewPanel && webviewPanel.visible) {
        webviewPanel.webview.html = webviewManager.getWebviewContent(conversationHistory.inputs, conversationHistory.responses);
    }

    try {
        const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey, context.globalState.get('selectedOpenAIModel'));

        // Replace the loading state with the actual response
        conversationHistory.responses[conversationHistory.responses.length - 1] = gptResponse;

        // Update the webview with the new response
        if (webviewPanel && webviewPanel.visible) {
            webviewPanel.webview.html = webviewManager.getWebviewContent(conversationHistory.inputs, conversationHistory.responses);
        }
    } catch (error) {
        vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
        // Replace the loading state with an error message
        conversationHistory.responses[conversationHistory.responses.length - 1] = "Error generating response.";

        // Update the webview with the error message
        if (webviewPanel && webviewPanel.visible) {
            webviewPanel.webview.html = webviewManager.getWebviewContent(conversationHistory.inputs, conversationHistory.responses);
        }
    }
}

async function getApiKey(context) {
    let apiKey = context.globalState.get('openaiApiKey');
    if (!apiKey) {
        await apiKeyManager.setApiKey(context);
        apiKey = context.globalState.get('openaiApiKey');
        if (!apiKey) {
            vscode.window.showErrorMessage('FrankGPT: No API key set. Please set your API key to use this feature.');
            return null;
        }
    }
    return apiKey;
}

function findAnalysisBlock(text) {
    const lines = text.split('\n');
    let startIndex = -1, endIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('///analysis start') && startIndex === -1) startIndex = i;
        else if (lines[i].includes('///analysis end') && endIndex === -1) endIndex = i;
    }
    return { startIndex, endIndex, lines };
}

module.exports = { activate, deactivate };
