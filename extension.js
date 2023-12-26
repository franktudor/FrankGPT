const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');
const modelSelector = require('./model-selector');
const webviewManager = require('./webview-manager');

let lastUserInput = '';
let lastGPTResponse = '';

function activate(context) {
    console.log('FrankGPT extension is now active.');

    registerCommand(context, 'frankgpt.helloWorld', displayHelloWorld);
    registerCommand(context, 'frankgpt.selectModel', () => modelSelector.selectModel(context));
    registerCommand(context, 'frankgpt.askGPT', () => handleAskGPT(context));
    registerCommand(context, 'frankgpt.setApiKey', () => apiKeyManager.setApiKey(context));
    registerCommand(context, 'frankgpt.clearApiKey', () => apiKeyManager.clearApiKey(context));
    registerCommand(context, 'frankgpt.analyzeCode', () => handleAnalyzeCode(context));
    registerCommand(context, 'frankgpt.openWebview', () => handleOpenWebview(context));
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
            lastUserInput = userInput;
            lastGPTResponse = gptResponse;
            const panel = webviewManager.createWebviewPanel(context);
            panel.webview.html = webviewManager.getWebviewContent(userInput, gptResponse);
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
        lastGPTResponse = gptResponse;
        // Consider showing response in a webview here as well
    } catch (error) {
        vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
    }
}

function handleOpenWebview(context) {
    const panel = webviewManager.createWebviewPanel(context);
    panel.webview.html = webviewManager.getWebviewContent(lastUserInput, lastGPTResponse);
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
