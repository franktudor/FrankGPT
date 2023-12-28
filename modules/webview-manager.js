const vscode = require('vscode');

function createWebviewPanel(context) {
    const panel = vscode.window.createWebviewPanel(
        'chatGPTResponse',
        'ChatGPT Response',
        vscode.ViewColumn.One, // Editor column to show the new webview panel in
        {
            // Enable scripts in the webview
            enableScripts: true
        }
    );

    context.subscriptions.push(panel);
    return panel;
}

function getWebviewContent(userInputs, responses) {
    // Generate the conversation history
    let conversationHistory = '';
    for (let i = 0; i < userInputs.length; i++) {
        conversationHistory += `
            <div>
                <h2>User Input:</h2>
                <p>${userInputs[i]}</p>
                <h2>ChatGPT Response:</h2>
                <p>${responses[i]}</p>
            </div>
        `;
    }

    // HTML content for the webview
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ChatGPT Interaction</title>
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:; style-src vscode-resource: 'unsafe-inline';">
        </head>
        <body>
            ${conversationHistory}

            <div>
                <h2>New Input:</h2>
                <textarea id="userInput" rows="4" cols="50"></textarea>
                <button id="submitButton">Submit</button>
            </div>

            <script>
                const vscode = acquireVsCodeApi();
                
                document.getElementById('submitButton').addEventListener('click', () => {
                    const userInput = document.getElementById('userInput').value;
                    console.log('Button clicked. User input:', userInput); // Debug log

                    try {
                        vscode.postMessage({
                            command: 'submitQuery',
                            text: userInput
                        });
                        console.log('Message posted to extension', { command: 'submitQuery', text: userInput }); // Enhanced debug log
                    } catch (error) {
                        console.error('Error posting message:', error); // Error log
                    }

                    document.getElementById('userInput').value = ''; // Clear the text area after sending
                });

                // Debug listener for messages sent back to the webview
                window.addEventListener('message', event => {
                    console.log('Message received in webview:', event.data);
                });
            </script>
        </body>
        </html>`;
}

module.exports = {
    createWebviewPanel,
    getWebviewContent
};
