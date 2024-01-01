const vscode = require('vscode');
const path = require('path');

// Function to create a Webview Panel
function createWebviewPanel(context) {
    const panel = vscode.window.createWebviewPanel(
        'chatGPTResponse',
        'ChatGPT Response',
        vscode.ViewColumn.One, 
        { enableScripts: true }
    );

    context.subscriptions.push(panel);
    return panel;
}

// Function to escape HTML for security
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Function to format the chat response
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

// Function to generate the URI for resources
function getUri(extensionUri, fileName) {
    const filePath = vscode.Uri.file(path.join(extensionUri.fsPath, 'includes', fileName));
    return filePath.with({ scheme: 'vscode-resource' });
}

// Function to generate the conversation history HTML
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

// Function to generate a nonce for CSP
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Function to get the content for the webview
function getWebviewContent(userInputs, responses, extensionUri) {
    if (!extensionUri) {
        console.error('Extension URI is undefined');
        return '';
    }

    const nonce = getNonce();
    const conversationHistory = generateConversationHistory(userInputs, responses);

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ChatGPT Interaction</title>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}' 'unsafe-inline' vscode-resource:; style-src 'nonce-${nonce}' 'unsafe-inline' vscode-resource:;">
            <link nonce="${nonce}" href="${getUri(extensionUri, 'style.css')}" rel="stylesheet" />
            <link nonce="${nonce}" href="${getUri(extensionUri, 'prism.css')}" rel="stylesheet" />
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
            <script nonce="${nonce}" src="${getUri(extensionUri, 'script.js')}"></script>
            <script nonce="${nonce}" src="${getUri(extensionUri, 'prism.js')}"></script>
        </body>
        </html>`;
}

module.exports = {
    createWebviewPanel,
    getWebviewContent
};
