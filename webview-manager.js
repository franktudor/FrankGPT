const vscode = require('vscode');

function createWebviewPanel(context) {
    const panel = vscode.window.createWebviewPanel(
        'chatGPTResponse', 
        'ChatGPT Response', 
        vscode.ViewColumn.One, 
        {}
    );

    context.subscriptions.push(panel);
    return panel;
}

function getWebviewContent(response) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ChatGPT Response</title>
        </head>
        <body>
            <p>${response}</p>
        </body>
        </html>`;
}

module.exports = {
    createWebviewPanel,
    getWebviewContent
};