const vscode = require('vscode');
const showdown = require('showdown');

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

// Function to generate a nonce for CSP
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getWebviewContent(userInputs, responses) {
    // Create a Showdown converter
    let converter = new showdown.Converter({sanitize: true});
    // Generate the conversation history
    let conversationHistory = '';
    for (let i = 0; i < userInputs.length; i++) {
    // Convert ChatGPT response from Markdown to HTML
    let responseHtml = converter.makeHtml(responses[i]);

        conversationHistory += `
            <div>
                <h2>User Input:</h2>
                <p>${userInputs[i]}</p>
                <h2>ChatGPT Response:</h2>
                <div>${responseHtml}</div>
            </div>
        `;
    }
    const nonce = getNonce();
    // HTML content for the webview
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ChatGPT Interaction</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'nonce-${nonce}' 'unsafe-inline' https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/; script-src 'nonce-${nonce}' https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/; img-src https:; connect-src https:;">
            <style nonce="${nonce}">
                /* Style for the warning message */
                .warning {
                    background-color: #FFA500; /* Light orange background */
                    color: black; /* Black text */
                    font-weight: bold; /* Bold text */
                    text-align: center;
                    padding: 10px;
                    border-bottom: 1px solid black; /* Optional: adds a border line below the warning */
                }

                /* Style for the entire container */
                .container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                }

                /* Conversation history styling */
                .conversation-history {
                    flex-grow: 1; /* Takes up available space */
                    overflow-y: auto; /* Enables vertical scrolling */
                    padding: 10px;
                }

                /* Style to make the input area stick to the bottom */
                .input-area {
                    padding: 10px;
                    background: #f3f3f3; /* Just for better visibility */
                }
            </style>
        </head>
        <body>
        <div class="container">
        <!-- Warning message at the top -->
            <div class="warning">
            Please do not enter any sensitive information such as usernames, passwords, or API keys.
            </div>
            <!-- Conversation history -->
            <div class="conversation-history">
            <div class="container">
                ${conversationHistory}
            </div>
            </div>

            <!-- Input area that sticks to the bottom -->
            <div class="input-area">
            <h2>New Input:</h2>
            <textarea id="userInput" rows="4" cols="50"></textarea>
            <button id="submitButton">Submit</button>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
        <script nonce="${nonce}">
            document.addEventListener('DOMContentLoaded', (event) => {
                document.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightBlock(block);
                });
            });
        </script>
        <script nonce="${nonce}">
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
            function scrollToBottom() {
                const conversationHistoryElement = document.querySelector('.conversation-history');
                conversationHistoryElement.scrollTop = conversationHistoryElement.scrollHeight;
                }
            // Scroll to the bottom
            scrollToBottom();  
        </script>
    </body>
    </html>`;
}

module.exports = {
    createWebviewPanel,
    getWebviewContent
};
