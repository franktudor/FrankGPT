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

## Known Issues

- Slow responses under poor network conditions.
- Best performance with English language queries.

## Release Notes

### 0.0.6
- Context-aware assistance and real-time code suggestions.
- Model selection for Ada, Babbage, Curie, Davinci, and GPT-3.5 Turbo.
- Enhanced API key management and security.
- Refined handling for API response codes, including rate limits.

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
