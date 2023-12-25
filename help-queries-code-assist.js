const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');
const apiKeyManager = require('./api-key-manager');

function activate(context) {
    let analyzeCodeCommand = vscode.commands.registerCommand('frankgpt.analyzeCode', async () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No code found. Open a file with code to analyze.');
            return;
        }

        let text = editor.document.getText();
        let lines = text.split('\n');
        let startIndex = -1, endIndex = -1;
        let selectedCode = '';

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
        selectedCode = lines.slice(startIndex + 1, endIndex).join('\n');

        let apiKey = context.globalState.get('openaiApiKey');
        if (!apiKey) {
            await apiKeyManager.setApiKey(context);
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

function deactivate() {
    // Add any cleanup logic here if needed
}

module.exports = {
    activate,
    deactivate
};
