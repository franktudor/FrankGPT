const vscode = require('vscode');
const chatGPT = require('./chatgpt-api-calls');

const frankgptModule = {
    // Handle general queries
    async askGPT() {
        const userInput = await vscode.window.showInputBox({ prompt: 'Ask FrankGPT anything about coding' });
        if (userInput) {
            this.processQuery(userInput);
        }
    },

    // Contextual code help (right-click menu)
    async contextualHelp(editor) {
        const selectedText = editor.selection.isEmpty ? '' : editor.document.getText(editor.selection);
        this.processQuery(selectedText);
    },

    // Automated code suggestions (while typing)
    async codeSuggestions(editor) {
        // Implementation depends on how you want to trigger and provide suggestions
    },

    // Debugging assistance
    async debuggingHelp(editor) {
        // Can be triggered on specific debugging events or commands
    },

    // Common method to process and show responses
    async processQuery(query) {
        try {
            const apiKey = vscode.workspace.getConfiguration('frankgpt').get('apiKey'); // Ensure you have set this up in extension settings
            const response = await chatGPT.getGPTResponse(query, apiKey);
            vscode.window.showInformationMessage(response);
        } catch (error) {
            vscode.window.showErrorMessage('FrankGPT Error: ' + error.message);
        }
    }
};

module.exports = frankgptModule;
