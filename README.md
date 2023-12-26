# FrankGPT - ChatGPT Integration for VSCode

FrankGPT is a sophisticated VSCode extension that seamlessly integrates OpenAI's ChatGPT, offering AI-powered coding assistance and insights directly within VSCode.

## Features

- **Enhanced ChatGPT Integration**: Quick, AI-powered responses within VSCode.
- **Model Selection Feature**: Switch between Ada, Babbage, Curie, Davinci, and GPT-3.5 Turbo.
- **Improved Error Handling**: Better response handling for OpenAI API scenarios.
- **Support for GPT-3.5 Turbo**: Specialized handling with a unique API endpoint.

## Requirements

- **VSCode Version**: 1.85.0 or later.
- **Internet Connection**: Required for ChatGPT interactions.

## Extension Settings

- `frankgpt.enable`: Enable/disable ChatGPT integration.
- `frankgpt.maxTokens`: Set maximum token count for responses.
- **API Key Management**:
  - `frankgpt.setApiKey`: Set OpenAI API key.
  - `frankgpt.clearApiKey`: Clear stored API key.

## Model Selection
- `frankgpt.selectModel`: Choose from a range of OpenAI models for different needs:
  - **Ada**: Cost-effective for basic tasks, quick responses.
  - **Babbage**: Good balance for general tasks, moderately priced.
  - **Curie**: Higher quality, suitable for complex tasks, more expensive.
  - **Davinci**: Highest quality for the most complex tasks, most expensive.
  - **GPT-3.5 Turbo**: Advanced tasks with an optimized balance of performance and cost.

## Code Analysis

First you must select the ChatGPT 3.5 Turbo then have a file opened in an editor then trap a segment of code with `///analysis start` ...code... `///analysis end` Then do `CTRL` + `ALT` + `A` or `FrankGPT: Analyze Code` and wait for the response.

## Known Issues

- Slow responses under poor network conditions.
- Best performance with English language queries.

## Release Notes

### 0.0.6
- Context-aware assistance and real-time code suggestions improvements.
- Fixed GPT-3.5 Turbo.
- Enhanced API key management and security.
- Tests

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

- **Query ChatGPT**: Use `FrankGPT: Ask a Question`.
- **Set API Key**: `FrankGPT: Set API Key` for OpenAI service access.
- **Model Selection**: `FrankGPT: Select Model` for performance balance.
- **Clear API Key**: `FrankGPT: Clear API Key` for security.

## More Information

- [VS Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy coding with FrankGPT's latest enhancements!**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Some Notes on Work Done and Concepts Explored

1. **Error Resolution in api-key-manager.js**: Corrected use of `context` object to resolve an error the extension.
2. **Code Review and Fixes**: Fixes for `api-key-manager.js`, `chat-gpt-api-calls.js`, and `extension.js` to implement user prompting for an OpenAI API key.
3. **API Key Prompt Enhancement**: Modified the extension to prompt users for an API key, enhancing user experience.
4. **Improved Error Handling**: Enhanced error messages in `chat-gpt-api-calls.js` for better user guidance.
5. **Package.json Updates**:
    - Added commands for API key management in `activationEvents` and `contributes.commands`.
    - Included keywords for improved extension discoverability.
6. **Command Discoverability and Usability**: Worked through strategies for making commands more user-friendly and discoverable in the Command Palette.
7. **Code Refinements**:
    - Improved naming conventions for clarity.
    - Added detailed command descriptions for the Command Palette.
    - Fixed keybindings section in `package.json`.
8. **Final Code Integration**: Integrated incremental improvements into `extension.js` for a seamless user experience, focusing on API key setup and usage.
9. **VS Code Plugins for Local Imports**: Explored how to build extensions for managing local imports and other code tasks.
10. **JavaScript Type Checking in 'jsconfig.json'**: Enabled JavaScript type checking in the project configuration.
11. **Choice of JavaScript Package Manager**: Compared npm and Yarn, offering insights for package management decision. stayed with NPM. PNPM did not work well.
12. **ChatGPT API Overview**: Tooled with OpenAI Assistants API for integration in the extension.
13. **Free Text Generation Model Options**: Explored various free or cost-effective AI tools for text generation, including OpenAI's GPT-3 Playground.
14. **Working with OpenAI GPT-3 Playground**: Guided on using and integrating OpenAI's GPT-3 Playground with the extension.
15. **JavaScript and Node.js Setup**: Assisted in setting up Node.js and npm, including troubleshooting.
16. **ChatGPT API Integration**: Covered the integration of OpenAI's ChatGPT API, including API requests, key management, and model selection.
17. **Extension Functionalities**: Worked on features like model selection, API key management, and query handling.
18. **Code Review and Debugging**: Reviewed and debugged multiple JavaScript files of the extension for best practices and error handling.
19. **Package.json Configuration**: Updated `package.json` with repository details, versioning, and licensing.
20. **General Guidance and Tips**: Provided advice on extension development, best practices, and effective use of VSCode features.
21. **Troubleshooting**: Addressed various issues, offering solutions and suggestions.
22. **Building a .vsix File**: Discussed using the vsce package for building the extension file.
23. **Extension Deactivation Behavior**: Covered best practices for API key management upon deactivation.
24. **Extension Tests**: Advised on setting up and conducting tests using the VS Code testing framework.
25. **Launch Configuration for Testing**: Reviewed the `launch.json` configuration for testing and development environments.
26. **README Update**: Updated the README file with features, usage, requirements, settings, licence, and release notes.
