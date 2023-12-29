const vscode = require('vscode');

/**
 * Sets the OpenAI API key in the global state of the extension.
 * @param {{ globalState: { update: (key: string, value: string) => Promise<void> }}} context
 */
async function setApiKey(context) {
    try {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your OpenAI API key',
            placeHolder: 'API Key',
            ignoreFocusOut: true
        });

        if (apiKey) {
            await context.globalState.update('openaiApiKey', apiKey);
            showMessage('FrankGPT: ChatAPI Key set successfully. For better OpSec remember to clear your OpenAI API key by using FrankGPT: Clear API Key when you are done working.');
        }
    } catch (error) {
        console.error('Error setting API key:', error);
        showMessage('Error: Unable to set API key.');
    }
}

/**
 * Clears the OpenAI API key from the global state of the extension.
 * @param {{ globalState: { update: (key: string, value: any) => Promise<void> }}} context
 */
async function clearApiKey(context) {
    try {
        await context.globalState.update('openaiApiKey', undefined);
        showMessage('FrankGPT: your ChatAPI Key has been cleared. Thank you for using my extension! Add your API key again when you are ready to continue using FrankGPT.');
    } catch (error) {
        console.error('Error clearing API key:', error);
        showMessage('Error: Unable to clear API key.');
    }
}

/**
 * Shows an information message to the user.
 * @param {string} message 
 */
function showMessage(message) {
    vscode.window.showInformationMessage(message);
}

module.exports = {
    setApiKey,
    clearApiKey
};
