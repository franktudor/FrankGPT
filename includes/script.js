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