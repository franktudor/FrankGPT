const assert = require('assert');
const vscode = require('vscode');
const { activate, deactivate } = require('../extension');

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	// Example of a simple test
	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	test('Extension Activation', async () => {
		const extension = vscode.extensions.getExtension('FrankTudor.frankgpt');
		if (!extension) {
			assert.fail('Extension not found');
		}
		await extension.activate();
		assert.ok(extension.isActive);
	});

	// Test deactivation of the extension
	test('Extension Deactivation', () => {
		const mockContext = { globalState: new MockMemento() };
		deactivate(mockContext);
		// Add assertions if there are any expected changes upon deactivation
	});

	// Test setting and clearing API key
	test('Manage API Key', async () => {
		let context = { globalState: new MockMemento() };
		// Mock the necessary methods to test API key setting and clearing
		// ...
		// Perform tests on setting and clearing API key
		// ...
	});

	// Test model selection functionality
	test('Model Selection', async () => {
		let context = { globalState: new MockMemento() };
		// Mock the necessary methods and perform tests
		// ...
	});

	// Test asking ChatGPT (requires mocking network requests)
	test('Ask ChatGPT', async () => {
		let context = { globalState: new MockMemento() };
		// Mock network request and test the command's functionality
		// ...
	});
});

class MockMemento {
	constructor() {
		this.state = {};
	}

	get(key) {
		return this.state[key];
	}

	update(key, value) {
		this.state[key] = value;
		return Promise.resolve();
	}
}
