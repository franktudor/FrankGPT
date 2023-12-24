const vscode = require('vscode');

function setApiKey(context) {
    vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API key',
        placeHolder: 'API Key',
        ignoreFocusOut: true
    }).then(apiKey => {
        if (apiKey) {
            context.globalState.update('openaiApiKey', apiKey);
            vscode.window.showInformationMessage('API Key set successfully.');
        }
    });
}

function clearApiKey(context) {
    context.globalState.update('openaiApiKey', undefined);
    vscode.window.showInformationMessage('API Key cleared.');
}

module.exports = {
    setApiKey,
    clearApiKey
};
