#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const program = new Command();

const MCP_URL = 'https://rube.app/mcp';
const CURSOR_DEEPLINK = 'cursor://anysphere.cursor-deeplink/mcp/install?name=rube&config=eyJ1cmwiOiJodHRwczovL3J1YmUuY29tcG9zaW8uZGV2L21jcD9hZ2VudD1jdXJzb3IifQ%3D%3D';
const VSCODE_DEEPLINK = 'vscode:mcp/install?%7B%22name%22%3A%22rube%22%2C%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22mcp-remote%22%2C%22https%3A%2F%2Frube.app%2Fmcp%22%5D%7D';

program
  .name('rube')
  .description('Rube MCP Server setup utility')
  .version('1.0.0');

program
  .command('setup')
  .description('Interactive setup for your AI client')
  .action(async () => {
    console.log(chalk.blue.bold('\n🚀 Rube MCP Server Setup\n'));
    
    const { client } = await inquirer.prompt([
      {
        type: 'list',
        name: 'client',
        message: 'Which AI client are you using?',
        choices: [
          { name: 'Claude Desktop (Pro/Max plan - manual setup)', value: 'claude-desktop' },
          { name: 'Claude Desktop (Free/Pro plan - auto setup)', value: 'claude-free' },
          { name: 'Claude Code (CLI)', value: 'claude-code' },
          { name: 'VS Code (with ChatGPT/Claude extensions)', value: 'vscode' },
          { name: 'Cursor', value: 'cursor' },
          { name: 'Other/Manual', value: 'manual' }
        ]
      }
    ]);

    switch (client) {
      case 'claude-desktop':
        await setupClaudeDesktop();
        break;
      case 'claude-free':
        await setupClaudeFree();
        break;
      case 'claude-code':
        await setupClaudeCode();
        break;
      case 'vscode':
        await setupVSCode();
        break;
      case 'cursor':
        await setupCursor();
        break;
      case 'manual':
        showManualInstructions();
        break;
    }
  });

program
  .command('info')
  .description('Show Rube MCP server information')
  .action(() => {
    console.log(chalk.blue.bold('\n📋 Rube MCP Server Information\n'));
    console.log('Server URL:', chalk.cyan(MCP_URL));
    console.log('Cursor Deeplink:', chalk.cyan(CURSOR_DEEPLINK));
    console.log('VS Code Deeplink:', chalk.cyan(VSCODE_DEEPLINK));
    console.log('Documentation:', chalk.cyan('https://rube.app'));
    console.log('Support:', chalk.cyan('support@composio.dev'));
    console.log('\nConnects to 500+ apps including:');
    console.log('• Gmail, Slack, Notion, GitHub, Linear');
    console.log('• Airtable, Trello, Asana, Jira');
    console.log('• Google Drive, Dropbox, OneDrive');
    console.log('• And many more...\n');
  });

async function setupClaudeDesktop() {
  console.log(chalk.green.bold('\n📱 Claude Desktop Setup (Pro/Max Plan)\n'));
  console.log('1. Open Claude Desktop');
  console.log('2. Go to Settings → Connectors');
  console.log('3. Click "Add custom connector"');
  console.log('4. Enter these details:');
  console.log('   • Name: Rube');
  console.log('   • URL:', chalk.cyan(MCP_URL));
  console.log('5. Click "Add" and then "Connect"');
  console.log('6. Complete the authentication in your browser\n');
  
  const { copyUrl } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'copyUrl',
      message: 'Copy MCP URL to clipboard?',
      default: true
    }
  ]);
  
  if (copyUrl) {
    try {
      await execAsync(`echo "${MCP_URL}" | pbcopy`);
      console.log(chalk.green('✅ URL copied to clipboard!'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not copy to clipboard. Please copy manually:', MCP_URL));
    }
  }
}

async function setupClaudeFree() {
  console.log(chalk.green.bold('\n📱 Claude Desktop Setup (Free/Pro Plan)\n'));
  
  const command = `npx @composio/mcp@latest setup "${MCP_URL}" "rube" --client claude`;
  console.log('Run this command in your terminal:');
  console.log(chalk.cyan(command));
  console.log('\nThis will automatically configure Rube for your Claude Desktop.\n');
  
  const { runCommand } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'runCommand',
      message: 'Run the setup command automatically?',
      default: true
    }
  ]);
  
  if (runCommand) {
    try {
      console.log(chalk.yellow('Running setup command...'));
      const { stdout, stderr } = await execAsync(command);
      if (stdout) console.log(stdout);
      if (stderr) console.log(chalk.yellow(stderr));
      console.log(chalk.green('✅ Setup complete! Restart Claude Desktop to use Rube.'));
    } catch (error) {
      console.log(chalk.red('❌ Setup failed. Please run manually:'));
      console.log(chalk.cyan(command));
    }
  }
}

async function setupClaudeCode() {
  console.log(chalk.green.bold('\n💻 Claude Code Setup\n'));
  
  const command = `claude mcp add --transport http rube -s user "${MCP_URL}"`;
  console.log('Run this command in your terminal:');
  console.log(chalk.cyan(command));
  console.log('\nThen:');
  console.log('1. In Claude Code chat, run /mcp');
  console.log('2. Select "rube" and press Enter to authenticate');
  console.log('3. Complete the sign-in flow in your browser\n');
  
  const { runCommand } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'runCommand',
      message: 'Run the command automatically?',
      default: true
    }
  ]);
  
  if (runCommand) {
    try {
      console.log(chalk.yellow('Running command...'));
      const { stdout, stderr } = await execAsync(command);
      if (stdout) console.log(stdout);
      if (stderr) console.log(chalk.yellow(stderr));
      console.log(chalk.green('✅ Command executed! Follow the authentication steps above.'));
    } catch (error) {
      console.log(chalk.red('❌ Command failed. Please run manually:'));
      console.log(chalk.cyan(command));
    }
  }
}

async function setupVSCode() {
  console.log(chalk.green.bold('\n📝 VS Code Setup\n'));
  
  console.log('Option 1 - One-click install (recommended):');
  console.log('Click this link to install automatically:');
  console.log(chalk.cyan(VSCODE_DEEPLINK));
  console.log('\nOption 2 - Manual command:');
  const command = `npx mcp-remote "${MCP_URL}"`;
  console.log(chalk.cyan(command));
  console.log('\nAfter installation:');
  console.log('1. Restart VS Code');
  console.log('2. The MCP server will be automatically available in chat\n');
  
  const { runCommand } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'runCommand',
      message: 'Run the setup command automatically?',
      default: true
    }
  ]);
  
  if (runCommand) {
    try {
      console.log(chalk.yellow('Running setup command...'));
      const { stdout, stderr } = await execAsync(command);
      if (stdout) console.log(stdout);
      if (stderr) console.log(chalk.yellow(stderr));
      console.log(chalk.green('✅ Setup complete! Restart VS Code and follow the steps above.'));
    } catch (error) {
      console.log(chalk.red('❌ Setup failed. Please run manually:'));
      console.log(chalk.cyan(command));
    }
  }
}

async function setupCursor() {
  console.log(chalk.green.bold('\n🎯 Cursor Setup\n'));
  
  console.log('Option 1 - One-click install (recommended):');
  console.log('Click this link to install automatically:');
  console.log(chalk.cyan(CURSOR_DEEPLINK));
  console.log('\nOption 2 - Manual setup:');
  console.log('1. In Cursor, click "Add MCP Server"');
  console.log('2. In the dialog, enter:');
  console.log('   • Name: rube');
  console.log('   • Type: streamableHttp');
  console.log('   • URL: https://rube.composio.dev/mcp?agent=cursor');
  console.log('3. Confirm installation and authenticate\n');
  
  const { openLink } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'openLink',
      message: 'Open the one-click install link now?',
      default: true
    }
  ]);
  
  if (openLink) {
    try {
      await execAsync(`open "${CURSOR_DEEPLINK}"`);
      console.log(chalk.green('✅ Opening Cursor install link...'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Could not open link. Please copy manually:', CURSOR_DEEPLINK));
    }
  }
}

function showManualInstructions() {
  console.log(chalk.green.bold('\n📚 Manual Setup Instructions\n'));
  console.log('For any MCP-compatible client, use:');
  console.log('• Server URL:', chalk.cyan(MCP_URL));
  console.log('• Server Type: HTTP/streamableHttp');
  console.log('\nRefer to your client\'s documentation for adding MCP servers.');
  console.log('Full documentation: https://rube.app\n');
}

program.parse();