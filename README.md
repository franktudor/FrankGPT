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

## FrankGPT OpenAI ChatGPT Extension Functionalities

### General Features
- `frankgpt.enable`: Enable/disable the FrankGPT extension.
- `frankgpt.maxTokens`: Set the maximum token count for ChatGPT responses.

### API Key Management
- `frankgpt.setApiKey`: Command to set your OpenAI API key.
- `frankgpt.clearApiKey`: Clear the stored OpenAI API key.

### Model Selection
- `frankgpt.selectModel`: Choose from various OpenAI models:
  - **Ada**: Efficient for basic tasks with quick responses.
  - **Babbage**: Balanced performance for general tasks.
  - **Curie**: High-quality output for complex tasks.
  - **Davinci**: Top-tier quality for the most intricate tasks.
  - **GPT-3.5 Turbo**: Optimized for advanced tasks balancing performance and cost.

### ChatGPT Integration
- `frankgpt.askGPT`: Interact with ChatGPT by asking questions or submitting prompts.
- `frankgpt.analyzeCode`: Analyze code blocks within your editor. Enclose the code segment with `///analysis start` and `///analysis end` markers, then use `CTRL` + `ALT` + `A` or the `FrankGPT: Analyze Code` command.
- `frankgpt.openWebview`: Open a webview panel to display ChatGPT responses.

### Webview Management
- Manages the content of webviews to display ChatGPT conversations, including inputs and responses.

### Additional Commands
- `frankgpt.helloWorld`: A simple command to display a greeting message and confirm the extension's activation.
- Commands to manage and interact with the extension, enhancing user experience and functionality.

### Contextual Utilities
- Contextual subscriptions and utility functions for enhanced interaction with Visual Studio Code and the ChatGPT API.

### Extension Activation and Deactivation
- Detailed activation and deactivation procedures to manage resources and settings effectively.

## Prerequisites and Assumptions for Using This Tool but more for A.I. (could be opinions too)

This code was kicke-off using: 

### Development Experience Required:
1. **Familiarity with VSCode**: Essential for navigating and utilizing the features of this tool.
2. **Proficiency in Node.js Development**: A foundational skill for working effectively with this tool.
3. **Use of NVM instead of NPM**: A tool to better manage Node and NPM versions: https://github.com/nvm-sh/nvm
4. **Understanding of Git**: Knowledge of Git is crucial for efficient version control and managing development branches.
5. **Yeoman and VS Code Extension Generator**: https://github.com/microsoft/vscode-generator-code
6. **Awareness of the .vsix SDK and OpenAI API**: While not mandatory, lacking this understanding may steepen your learning curve, particularly when dealing with complex problems that may require exploratory coding and iterative development.
7. **General coding best practices** 

### Managing Expectations with A.I.:
- **A.I. Limitations**: A.I. is a powerful tool but it's not a panacea for all coding challenges. It can streamline certain tasks but might complicate others. The key is to remain adaptable and resourceful.
- **Self-Reliance**: A.I. assists in fostering independence, especially for solo developers or small teams. It can reduce the need for large teams by enabling individuals to handle complex tasks more efficiently.

### Organizational Assumptions:
1. **Leadership Skills**: Ability to set clear goals and expectations is crucial for guiding A.I.-assisted development.
2. **Innovative Thinking in Coders**: Success with A.I. augmentation requires creativity, experience, and the ability to think outside the box.

### The Impact of A.I. Augmentation:
- **Team Size Reduction**: An A.I.-augmented developer could potentially replace 2-3 traditional coders in small to medium-sized projects, thanks to enhanced efficiency and productivity.
- **Overcoming Organizational Constraints**: In scenarios where team expansion is limited by budget or other constraints, integrating A.I. can open new possibilities and expand the team's capabilities without needing additional personnel.

### Conclusion:
Incorporating A.I. into your development process is a strategic move that can elevate your capabilities and efficiency. While it requires certain skills and adjustments, the potential benefits in terms of productivity and problem-solving are substantial.

## Known Issues

- Slow responses under poor network conditions.
- Best performance with English language queries.

## Release Notes

### 0.0.7
- fixed webview

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