#!/usr/bin/env node

/**
 * Documentation generation script for cross-env-cmd
 * 
 * This script generates comprehensive API documentation using TypeDoc
 * and creates additional documentation files.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, description) {
  log(`\n${colors.cyan}📚 ${description}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully`, 'green');
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

function createDocsIndex() {
  const docsPath = path.join(__dirname, '..', 'docs');
  const indexPath = path.join(docsPath, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    log('📄 API documentation index already exists', 'yellow');
    return;
  }

  log('📄 Creating API documentation index...', 'cyan');
  
  const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cross-env-cmd API Documentation</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            margin-bottom: 3rem;
        }
        .logo {
            font-size: 2.5rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .description {
            color: #7f8c8d;
            font-size: 1.1rem;
        }
        .nav {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        .nav-item {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            color: #2c3e50;
            transition: all 0.3s ease;
        }
        .nav-item:hover {
            background: #e9ecef;
            transform: translateY(-2px);
        }
        .nav-item h3 {
            margin: 0 0 0.5rem 0;
            color: #3498db;
        }
        .nav-item p {
            margin: 0;
            font-size: 0.9rem;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">cross-env-cmd</div>
        <div class="description">A merge of cross-env and env-cmd - Load environment variables from files and execute commands</div>
    </div>

    <div class="nav">
        <a href="modules.html" class="nav-item">
            <h3>📚 API Reference</h3>
            <p>Complete TypeScript API documentation with examples and type definitions</p>
        </a>
        <a href="examples.html" class="nav-item">
            <h3>🏠 User Guide</h3>
            <p>Getting started guide, examples, and usage instructions</p>
        </a>
        <a href="https://github.com/ValoriaTechnologia/cross-env-cmd" class="nav-item">
            <h3>🐙 GitHub</h3>
            <p>Source code, issues, and contributions</p>
        </a>
    </div>

    <div style="text-align: center; margin-top: 3rem; color: #7f8c8d;">
        <p>Generated with ❤️ using TypeDoc</p>
    </div>
</body>
</html>`;

  fs.writeFileSync(indexPath, indexContent);
  log('✅ API documentation index created', 'green');
}

function generateReadme() {
  const readmePath = path.join(__dirname, '..', 'docs', 'README.md');
  
  if (fs.existsSync(readmePath)) {
    log('📄 API README already exists', 'yellow');
    return;
  }

  log('📄 Creating API README...', 'cyan');
  
  const readmeContent = `# cross-env-cmd API Documentation

This directory contains the automatically generated API documentation for cross-env-cmd.

## Overview

cross-env-cmd is a powerful tool that combines the functionality of cross-env and env-cmd, allowing you to:

- Load environment variables from RC configuration files
- Load environment variables from multiple .env files
- Set inline environment variables
- Execute commands with the loaded environment

## Quick Start

\`\`\`bash
# Install
npm install cross-env-cmd

# Use with environment from RC file
cross-env-cmd -e staging npm start

# Use with environment files
cross-env-cmd -f .env.development -f .env.local npm test

# Use with inline variables
cross-env-cmd NODE_ENV=production DEBUG=true npm run build
\`\`\`

## API Categories

- **Configuration**: RC file loading and parsing
- **Environment Loading**: Loading variables from various sources
- **Command Execution**: Running commands with custom environment
- **CLI**: Command line interface and argument parsing
- **Types**: TypeScript type definitions

## Documentation Structure

- \`modules/index.html\` - Main API documentation
- \`classes/\` - Class documentation (if any)
- \`interfaces/\` - Interface documentation
- \`functions/\` - Function documentation

## Examples

See the [examples directory](../../examples/) for practical usage examples.

## Contributing

To regenerate this documentation:

\`\`\`bash
npm run docs
\`\`\`

To serve the documentation locally:

\`\`\`bash
npm run docs:serve
\`\`\`
`;

  fs.writeFileSync(readmePath, readmeContent);
  log('✅ API README created', 'green');
}

function main() {
  log(`${colors.bright}${colors.magenta}🚀 Starting documentation generation for cross-env-cmd${colors.reset}`);
  
  // Ensure docs directory exists
  const docsDir = path.join(__dirname, '..', 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  // Generate TypeDoc documentation
  execCommand('npx typedoc', 'Generating TypeDoc API documentation');
  
  // Create additional documentation files
  createDocsIndex();
  generateReadme();
  
  log(`\n${colors.bright}${colors.green}🎉 Documentation generation completed successfully!${colors.reset}`);
  log(`\n${colors.cyan}📖 Documentation available at:${colors.reset}`);
  log(`   • API Docs: ${colors.blue}docs/index.html${colors.reset}`);
  log(`   • User Guide: ${colors.blue}docs/examples.html${colors.reset}`);
  log(`\n${colors.yellow}💡 To serve documentation locally, run:${colors.reset}`);
  log(`   ${colors.blue}npm run docs:serve${colors.reset}`);
}

if (require.main === module) {
  main();
}

module.exports = { main };
