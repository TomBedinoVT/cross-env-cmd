#!/usr/bin/env node

import { loadEnvironment, executeCommand } from '../lib/index';
import { ParsedArgs } from '../types';

/**
 * Parse command line arguments for cross-env-cmd
 * 
 * Supports the following options:
 * - -e, --env: Environment name from RC file
 * - -f, --file: Environment file to load (can be used multiple times)
 * - --rc: RC configuration file path
 * - --version, -v: Show version
 * - --help, -h: Show help
 * - KEY=VALUE: Inline environment variables
 * 
 * @returns Parsed arguments object with all options and command
 * 
 * @example
 * ```typescript
 * // Parse: cross-env-cmd -e staging -f .env.local DEBUG=true npm start
 * const args = parseArgs();
 * // Result: {
 * //   environment: 'staging',
 * //   files: ['.env.local', '.env.staging'],
 * //   envVars: { DEBUG: 'true' },
 * //   command: ['npm', 'start']
 * // }
 * ```
 * 
 * @category CLI
 */
export function parseArgs(): ParsedArgs {
  const args = process.argv.slice(2);
  const options: ParsedArgs = {
    environment: null,
    files: [],
    rcFile: '.cross-env-cmdrc',
    envVars: {},
    command: []
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    
    if (arg === '-e' || arg === '--env') {
      options.environment = args[i + 1] || null;
      i += 2;
    } else if (arg === '-f' || arg === '--file') {
      const file = args[i + 1];
      if (file) {
        options.files.push(file);
      }
      i += 2;
    } else if (arg === '--rc') {
      options.rcFile = args[i + 1] || '.cross-env-cmdrc';
      i += 2;
    } else if (arg === '--version' || arg === '-v') {
      console.log('1.0.0');
      process.exit(0);
    } else if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    } else if (arg && arg.includes('=') && !arg.startsWith('-')) {
      // Environment variable
      const [key, ...valueParts] = arg.split('=');
      if (key) {
        options.envVars[key] = valueParts.join('=');
      }
      i++;
    } else {
      // Command starts here
      options.command = args.slice(i);
      break;
    }
  }

  return options;
}

/**
 * Display help information for cross-env-cmd
 * 
 * Shows usage, available options, and examples.
 * 
 * @category CLI
 */
function showHelp(): void {
  console.log(`
Usage: cross-env-cmd [options] [env-vars] <command>

Options:
  -e, --env <environment>    Environment name from .cross-env-cmdrc file
  -f, --file <file>          Environment file to load (can be used multiple times)
  --rc <file>                RC configuration file (default: .cross-env-cmdrc)
  -h, --help                 Show help
  -v, --version              Show version

Examples:
  cross-env-cmd -e staging npm start
  cross-env-cmd -e staging -f .env.local TEST=value npm test
  cross-env-cmd -f .env.development NODE_ENV=development npm run build
  cross-env-cmd -e staging -f .test.env -f .prod.env TEST=a BETA=e npm run deploy
`);
}

/**
 * Main entry point for cross-env-cmd CLI
 * 
 * Parses arguments, loads environment variables, and executes the command.
 * Handles errors and provides appropriate exit codes.
 * 
 * @category CLI
 */
async function main(): Promise<void> {
  try {
    const options = parseArgs();

    if (options.command.length === 0) {
      console.error('Error: No command specified');
      showHelp();
      process.exit(1);
    }

    // Load environment variables
    const finalEnv = await loadEnvironment({
      environment: options.environment || undefined,
      files: options.files,
      rcFile: options.rcFile,
      inlineVars: options.envVars
    });

    // Execute the command
    await executeCommand(options.command, finalEnv);
  } catch (error) {
    console.error('Error:', (error as Error).message);
    process.exit(1);
  }
}

// Only run main if this file is executed directly
if (require.main === module) {
  main();
}
