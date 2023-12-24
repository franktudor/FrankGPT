const vscode = require('vscode');

function setApiKey(context) {
    vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API key',
        placeHolder: 'API Key',
        ignoreFocusOut: true
    }).then(apiKey => {
        if (apiKey) {
            // Store the API key in the global state
            context.globalState.update('openaiApiKey', apiKey);
            vscode.window.showInformationMessage('API Key set successfully.');
        }
    });
}

function clearApiKey(context) {
    // Clear the stored API key
    context.globalState.update('openaiApiKey', undefined);
    vscode.window.showInformationMessage('API Key cleared.');
}

module.exports = {
    setApiKey,
    clearApiKey
};
