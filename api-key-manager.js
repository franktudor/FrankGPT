const vscode = require('vscode');

function setApiKey(context) {
    vscode.window.showInputBox({
        prompt: 'Enter your OpenAI API key',
        placeHolder: 'API Key',
        ignoreFocusOut: true
    }).then(apiKey => {
        if (apiKey) {
            context.globalState.update('openaiApiKey', apiKey);
            vscode.window.showInformationMessage('FrankGPT: ChatAPI Key set successfully. For better OpSec remember to clear your OpenAI API key by using FrankGPT: Clear API Key when you are done working.');
        }
    });
}

function clearApiKey(context) {
    context.globalState.update('openaiApiKey', undefined);
    vscode.window.showInformationMessage('FrankGPT: your ChatAPI Key has been cleared. Thank you for using my extenion! Add your API key again when you are ready to continue using FrankGPT.');
}

module.exports = {
    setApiKey,
    clearApiKey
};
