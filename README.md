# FrankGPT - ChatGPT Integration for VSCode

FrankGPT is a sophisticated VSCode extension that seamlessly integrates the advanced capabilities of OpenAI's ChatGPT (and a subset of models to work with). Designed to enhance productivity and efficiency in coding, it provides AI-driven insights, explanations, and coding assistance directly within the VSCode environment.

## Features

- **ChatGPT Integration**: Easy access to ChatGPT for quick, AI-powered responses to your queries, right within VSCode.
- **Efficient Coding Assistance**: Receive coding suggestions, detailed explanations, and prompt answers to your programming questions.
- **Customizable Interaction**: Fine-tune your ChatGPT experience with flexible settings to suit your workflow.
- **Secure API Key Management**: Conveniently set or clear your OpenAI API key within the extension, ensuring secure and personalized usage.
- **Model Selection**: Opt between various OpenAI models - Ada, Babbage, Curie, Davinci, and GPT-3.5 Turbo - to balance between response quality and cost.
- **Context-Aware Assistance**: Gain insights relevant to specific code segments in your editor for enhanced code understanding.
- **Real-Time Suggestions**: Benefit from on-the-fly coding suggestions, boosting both productivity and learning.

## Requirements

- **VSCode Version**: Requires VSCode version 1.85.0 or later.
- **Internet Connection**: A stable internet connection is necessary for ChatGPT interactions.

## Extension Settings

FrankGPT offers several settings for customization:

- `frankgpt.enable`: Toggle the ChatGPT integration on or off.
- `frankgpt.maxTokens`: Set the maximum token count for ChatGPT responses.

### API Key Management
- `frankgpt.setApiKey`: Enter your OpenAI API key.
- `frankgpt.clearApiKey`: Remove the stored OpenAI API key from the extension.

### Model Selection
- `frankgpt.selectModel`: Select the preferred AI model, balancing performance with cost.

## Known Issues

- Responses may be delayed under slow network conditions.
- Optimal performance is achieved with English language queries.

## Release Notes

### 0.0.5
- Integrated context-aware assistance for active code in the editor.
- Introduced real-time automated code suggestions based on typing activity.

### 0.0.4
- Added model selection feature with support for Ada, Babbage, Curie, Davinci, and GPT-3.5 Turbo.
- Enhanced API key management with improved set and clear functionality.

### 0.0.3
- Implemented secure OpenAI API key setting and clearing functionality.
- Refined error handling for various response scenarios from OpenAI's API.

### 0.0.2
- Improved handling of OpenAI API response codes, including the critical 429 rate limit exceeded error.

### 0.0.1
- Initial launch of FrankGPT.
- Basic integration with ChatGPT for coding support and assistance.

## Usage

- **Ask a Question**: Use the `FrankGPT: Ask a Question` command to query ChatGPT. Simply enter your question in the prompt, and receive AI-generated responses.
- **Set API Key**: Before using ChatGPT, set your API key using the `FrankGPT: Set API Key` command for secure access to OpenAI's services.
- **Select Model**: Choose your preferred AI model with `FrankGPT: Select Model` to balance between response quality and cost.
- **Clear API Key**: Ensure security by clearing your API key when not in use with the `FrankGPT: Clear API Key` command.

## Working with Markdown

This README is formatted with Markdown for easy updates. Use these editor shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows/Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows/Linux).
- Activate Markdown snippets (`Ctrl+Space`).

## More Information

- [VS Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy a more efficient coding experience with FrankGPT at your fingertips!**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
