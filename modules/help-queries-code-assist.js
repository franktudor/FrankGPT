const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');

const OPENAI_API_KEY = 'openaiApiKey';
const SELECTED_MODEL = 'selectedOpenAIModel';
const ANALYSIS_START = '///analysis start';
const ANALYSIS_END = '///analysis end';

function activate(context) {
    let analyzeCodeCommand = vscode.commands.registerCommand('analyzeCode', () => analyzeCode(context));
    context.subscriptions.push(analyzeCodeCommand);
}

async function analyzeCode(context) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No code found. Open a file with code to analyze.');
        return;
    }

    const selectedCode = extractSelectedCode(editor.document.getText());
    if (!selectedCode) {
        vscode.window.showInformationMessage('Analysis block not properly defined.');
        return;
    }

    const apiKey = await ensureApiKey(context);
    if (!apiKey) return;

    try {
        const selectedModel = context.globalState.get(SELECTED_MODEL);
        const gptResponse = await chatGPT.getGPTResponse(selectedCode, apiKey, selectedModel);
        vscode.window.showInformationMessage(gptResponse);
    } catch (error) {
        vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
    }
}

async function ensureApiKey(context) {
    let apiKey = context.globalState.get(OPENAI_API_KEY);
    if (!apiKey) {
        await apiKeyManager.setApiKey(context);
        apiKey = context.globalState.get(OPENAI_API_KEY);
        if (!apiKey) {
            vscode.window.showErrorMessage('FrankGPT: No API key set. Please set your API key to use this feature.');
            return null;
        }
    }
    return apiKey;
}

function extractSelectedCode(text) {
    const lines = text.split('\n');
    const startIndex = lines.findIndex(line => line.includes(ANALYSIS_START));
    const endIndex = lines.findIndex(line => line.includes(ANALYSIS_END));

    if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
        return null;
    }

    return lines.slice(startIndex + 1, endIndex).join('\n');
}

function deactivate() {
    // Add any cleanup logic here if needed
}

module.exports = {
    activate,
    deactivate
};
