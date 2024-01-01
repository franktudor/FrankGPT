const vscode = require('vscode');
const chatGPT = require('./modules/chatgpt-api-calls');
const apiKeyManager = require('./modules/api-key-manager');
const modelSelector = require('./modules/model-selector');
const path = require('path');
// In your webview content script

let conversationHistory = {
    inputs: [],
    responses: []
};

function activate(context) {
    console.log('FrankGPT extension is now active.');

    registerCommand(context, 'frankgpt.helloWorld', () => vscode.window.showInformationMessage('FrankGPT functions yay!'));
    registerCommand(context, 'frankgpt.selectModel', () => modelSelector.selectModel(context));
    registerCommand(context, 'frankgpt.askGPT', () => handleAskGPT(context));
    registerCommand(context, 'frankgpt.setApiKey', () => apiKeyManager.setApiKey(context));
    registerCommand(context, 'frankgpt.clearApiKey', () => apiKeyManager.clearApiKey(context));
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

async function handleAskGPT(context) {
    const apiKey = await getApiKey(context);
    if (!apiKey) return;

    const userInput = await vscode.window.showInputBox({ prompt: 'Ask me anything' });
    if (userInput) {
        try {
            const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey, context.globalState.get('selectedOpenAIModel'));
            conversationHistory.inputs.push(userInput);
            conversationHistory.responses.push(gptResponse);

            vscode.window.showInformationMessage('GPT Response:', gptResponse);

            const openInWebview = await vscode.window.showInformationMessage(
                'Do you want to view the response in a more detailed view?',
                'Yes', 'No'
            );

            if (openInWebview === 'Yes') {
                createAndSetupPanel(context);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`FrankGPT: Error - ${error.message}`);
        }
    }
}

function createAndSetupPanel(context) {
    const panel = createWebviewPanel(context);

    if (!context || !context.extensionUri) {
        console.error('Context or extensionUri is not defined');
        return;
    }

    console.log("createAndSetupPanel: ", context);
    const htmlContent = getWebviewContent(conversationHistory.inputs, conversationHistory.responses, context, panel.webview);

    if (!panel) {
        console.error('Panel creation failed');
        return;
    }

    panel.webview.html = htmlContent;
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

    conversationHistory.inputs.push(userInput);
    conversationHistory.responses.push("Generating response...");

    updateWebview(webviewPanel, context, conversationHistory);

    try {
        const gptResponse = await chatGPT.getGPTResponse(userInput, apiKey, context.globalState.get('selectedOpenAIModel'));
        conversationHistory.responses[conversationHistory.responses.length - 1] = gptResponse;
        updateWebview(webviewPanel, context, conversationHistory);
    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
        conversationHistory.responses[conversationHistory.responses.length - 1] = "Error generating response.";
        updateWebview(webviewPanel, context, conversationHistory);
    }
}

function updateWebview(webviewPanel, context, conversationHistory) {
    console.log("updateWebview: ", context);
    if (webviewPanel && webviewPanel.visible) {
        webviewPanel.webview.html = getWebviewContent(conversationHistory.inputs, conversationHistory.responses, context, webviewPanel.webview);
    }
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatResponse(response) {
    const parts = response.split(/```/);
    let formattedResponse = '';

    for (let i = 0; i < parts.length; i++) {
        const code = escapeHtml(parts[i]);
        if (i % 2 === 0) {
            formattedResponse += `<p>${code}</p>`;
        } else {
            formattedResponse += `
                <pre><code class="language-javascript">${code}</code></pre>
                <button class="copy-button" data-clipboard-text="${code}">Copy</button>`;
        }
    }
    return formattedResponse;
}

function generateConversationHistory(userInputs, responses) {
    return userInputs.map((input, index) => `
        <div>
            <h2>User Input:</h2>
            <p>${input}</p>
            <h2>ChatGPT Response:</h2>
            ${formatResponse(responses[index])}
        </div>
    `).join('');
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function createWebviewPanel() {
    const extensionUri = vscode.Uri.joinPath(
        vscode.Uri.file('/'), // The root directory (file:/)
        'frankgpt'
      );
    return vscode.window.createWebviewPanel(
        'chatGPTResponse',
        'ChatGPT Response',
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'includes')]
        }
    );
}

function getWebviewContent(userInputs, responses, context, webview) {
    const nonce = getNonce();
    const conversationHistory = generateConversationHistory(userInputs, responses);
    const extensionUri = vscode.Uri.joinPath(
        vscode.Uri.file('/'), // The root directory (file:/)
        'frankgpt'
      );
    const uris = ['style.css', 'prism.css', 'script.js', 'prism.js'].map(file =>
        webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'includes', file))
    );
    
    const [styleUri, prismStyleUri, scriptUri, prismScriptUri] = uris;

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; style-src ${webview.cspSource}; script-src ${webview.cspSource};">
            <link nonce="${nonce}" href="${prismStyleUri}" rel="stylesheet" />
            <link nonce="${nonce}" href="${styleUri}" rel="stylesheet" />
        </head>
        <body>
        <div class="container">
            <div class="warning">Please do not enter any sensitive information such as usernames, passwords, or API keys.</div>
            <div class="conversation-history">${conversationHistory}</div>
            <div class="input-area">
                <h2>New Input:</h2>
                <textarea id="userInput" rows="4" cols="50"></textarea>
                <button id="submitButton">Submit</button>
            </div>
        </div>
            <script nonce="${nonce}" src="${prismScriptUri}"></script>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>
    `;

    return htmlContent;
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

module.exports = {
    activate,
    deactivate
};