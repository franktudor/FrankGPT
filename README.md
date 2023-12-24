# FrankGPT - ChatGPT Integration for VSCode

FrankGPT is a powerful VSCode extension that integrates the capabilities of ChatGPT directly into your coding environment. It offers a seamless experience for obtaining AI-powered responses to coding queries, explanations, and more, all within VSCode.

## Features

- **ChatGPT Integration**: Direct access to ChatGPT from within VSCode. Just type your query and get instant AI-powered responses.
- **Efficient Coding Assistance**: Get coding suggestions, explanations, and quick answers to your programming questions.
- **Customizable Interaction**: Tailor your ChatGPT experience with customizable settings.
- **API Key Management**: Easily set or clear your OpenAI API key within the extension for secure and personalized usage.
- **Model Selection**: Choose between different OpenAI models, including Ada, Babbage, Curie, Davinci, and a cost-effective GPT-3.5 model, to balance performance and cost.

## Requirements

- **VSCode Version**: Ensure you have VSCode version 1.85.0 or newer.
- **Internet Connection**: An active internet connection is required for ChatGPT interactions.

## Extension Settings

FrankGPT provides the following customizable settings:

- `frankgpt.enable`: Enable or disable the ChatGPT integration.
- `frankgpt.maxTokens`: Configure the maximum number of tokens (words) in the ChatGPT response.
- **API Key Management**:
  - `frankgpt.setApiKey`: Set your OpenAI API key.
  - `frankgpt.clearApiKey`: Clear the stored OpenAI API key.
- **Model Selection**:
  - `frankgpt.selectModel`: Choose an AI model for different performance and cost options.

## Known Issues

- Delay in response under slow network conditions.
- Limited to English language queries for optimal results.

## Release Notes

### 0.0.4

- Added functionality to select different OpenAI models, including Ada, Babbage, Curie, Davinci, and a cost-effective GPT-3.5 model.
- Improved API key management with commands to set and clear the key.

### 0.0.3

- Implemented functionality to set and clear OpenAI API key.
- Improved error handling for different response codes from the OpenAI API.

### 0.0.2

- Added case/switch for response codes: 400, 401, 403, 429 and default case catch-all... 429 API rate limit exceeded was most important in my particular case.

### 0.0.1

- Initial release of FrankGPT.
- Basic ChatGPT integration for coding assistance.

## Working with Markdown

This README is written using Markdown, making it easy to update and maintain. Here are some editor keyboard shortcuts for convenience:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` for a list of Markdown snippets.

## More Information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy coding with FrankGPT at your fingertips!**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.