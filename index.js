/**
 * Rube MCP Server - npm package entry point
 * 
 * This package helps users set up the Rube MCP server hosted at https://rube.app/mcp
 * The actual MCP server runs remotely, this package just provides setup utilities.
 */

const MCP_SERVER_URL = 'https://rube.app/mcp';
const CURSOR_DEEPLINK = 'cursor://anysphere.cursor-deeplink/mcp/install?name=rube&config=eyJ1cmwiOiJodHRwczovL3J1YmUuY29tcG9zaW8uZGV2L21jcD9hZ2VudD1jdXJzb3IifQ%3D%3D';
const VSCODE_DEEPLINK = 'vscode:mcp/install?%7B%22name%22%3A%22rube%22%2C%22type%22%3A%22stdio%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22mcp-remote%22%2C%22https%3A%2F%2Frube.app%2Fmcp%22%5D%7D';

module.exports = {
  MCP_SERVER_URL,
  CURSOR_DEEPLINK,
  VSCODE_DEEPLINK,
  
  /**
   * Get the MCP server configuration for different clients
   */
  getConfig: (client) => {
    const configs = {
      'claude-desktop': {
        name: 'Rube',
        url: MCP_SERVER_URL,
        type: 'http'
      },
      'claude-free': {
        command: `npx @composio/mcp@latest setup "${MCP_SERVER_URL}" "rube" --client claude`
      },
      'claude-code': {
        command: `claude mcp add --transport http rube -s user "${MCP_SERVER_URL}"`
      },
      'vscode': {
        deeplink: VSCODE_DEEPLINK,
        command: `npx mcp-remote "${MCP_SERVER_URL}"`
      },
      'cursor': {
        deeplink: CURSOR_DEEPLINK,
        name: 'rube',
        type: 'streamableHttp'
      }
    };
    
    return configs[client] || { url: MCP_SERVER_URL };
  },
  
  /**
   * Get information about the Rube MCP server
   */
  getServerInfo: () => ({
    name: 'Rube MCP Server',
    description: 'Connect AI chat tools to 500+ applications',
    url: MCP_SERVER_URL,
    homepage: 'https://rube.app',
    support: 'support@composio.dev',
    apps: [
      'Gmail', 'Slack', 'Notion', 'GitHub', 'Linear', 'Airtable', 
      'Trello', 'Asana', 'Jira', 'Google Drive', 'Dropbox', 'OneDrive'
    ]
  })
};