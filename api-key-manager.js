const vscode = require('vscode');

function setApiKey() {
    vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API key',
        placeHolder: 'API Key',
        ignoreFocusOut: true
    }).then(apiKey => {
        if (apiKey) {
            // Store the API key in a global state or workspace state
            // For example, using globalState
            vscode.context.globalState.update('openaiApiKey', apiKey);
            vscode.window.showInformationMessage('API Key set successfully.');
        }
    });
}

function clearApiKey() {
    // Clear the stored API key
    vscode.context.globalState.update('openaiApiKey', undefined);
    vscode.window.showInformationMessage('API Key cleared.');
}

module.exports = {
    setApiKey,
    clearApiKey
};
