#!/usr/bin/env node

const chalk = require('chalk');

console.log(chalk.blue.bold('\n🎉 Rube MCP Server installed successfully!\n'));

console.log('Rube connects your AI tools to 500+ applications.');
console.log('The MCP server is hosted at: https://rube.app/mcp\n');

console.log(chalk.yellow.bold('Next steps:'));
console.log('1. Run ' + chalk.cyan('rube setup') + ' to configure for your AI client');
console.log('2. Or manually configure using the instructions below:\n');

console.log(chalk.green.bold('Claude Desktop:'));
console.log('• Go to Settings → Connectors → Add custom connector');
console.log('• URL: https://rube.app/mcp\n');

console.log(chalk.green.bold('Claude Code:'));
console.log('• Run: claude mcp add --transport http rube -s user "https://rube.app/mcp"\n');

console.log(chalk.green.bold('Claude Free/Pro:'));
console.log('• Run: npx @composio/mcp@latest setup "https://rube.app/mcp" "rube" --client claude\n');

console.log(chalk.green.bold('VS Code:'));
console.log('• One-click: vscode:mcp/install?%7B%22name%22%3A%22rube%22%2C%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22mcp-remote%22%2C%22https%3A%2F%2Frube.app%2Fmcp%22%5D%7D\n');

console.log(chalk.green.bold('Cursor:'));
console.log('• One-click: cursor://anysphere.cursor-deeplink/mcp/install?name=rube&config=eyJ1cmwiOiJodHRwczovL3J1YmUuY29tcG9zaW8uZGV2L21jcD9hZ2VudD1jdXJzb3IifQ%3D%3D\n');

console.log('For detailed setup instructions, visit: https://rube.app');
console.log('Support: support@composio.dev\n');