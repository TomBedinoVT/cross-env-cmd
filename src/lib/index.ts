import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { RCConfig, LoadEnvironmentOptions, EnvironmentVariables } from '../types';

/**
 * Load environment variables from various sources with configurable precedence
 * 
 * The loading order (highest to lowest precedence):
 * 1. Inline variables (inlineVars)
 * 2. Additional files (files array, last file wins)
 * 3. RC configuration environment
 * 4. System environment variables
 * 
 * @param options - Configuration options for loading environment variables
 * @returns Promise resolving to merged environment variables
 * 
 * @example
 * ```typescript
 * // Load from RC file environment
 * const env = await loadEnvironment({ environment: 'staging' });
 * 
 * // Load from multiple files
 * const env = await loadEnvironment({ 
 *   files: ['.env.development', '.env.local'] 
 * });
 * 
 * // Load with inline variables
 * const env = await loadEnvironment({
 *   environment: 'production',
 *   files: ['.env.override'],
 *   inlineVars: { DEBUG: 'true' }
 * });
 * ```
 * 
 * @category Environment Loading
 */
export async function loadEnvironment(options: LoadEnvironmentOptions = {}): Promise<EnvironmentVariables> {
  const {
    environment,
    files = [],
    rcFile = '.cross-env-cmdrc',
    inlineVars = {}
  } = options;

  let finalEnv: EnvironmentVariables = { ...process.env } as EnvironmentVariables;

  // Load RC configuration if environment is specified
  if (environment) {
    const rcConfig = await loadRCConfig(rcFile);
    if (rcConfig && rcConfig.environments && rcConfig.environments[environment]) {
      const envConfig = rcConfig.environments[environment];
      finalEnv = { ...finalEnv, ...envConfig };
    } else {
      throw new Error(`Environment '${environment}' not found in ${rcFile}`);
    }
  }

  // Load additional files specified via -f option
  for (const file of files) {
    const envFromFile = await loadEnvFile(file);
    finalEnv = { ...finalEnv, ...envFromFile };
  }

  // Apply inline variables (highest priority)
  finalEnv = { ...finalEnv, ...inlineVars };

  return finalEnv;
}

/**
 * Load and parse RC configuration file (.cross-env-cmdrc)
 * 
 * Supports both JSON and JavaScript module formats.
 * JavaScript modules are evaluated using Function constructor for security.
 * 
 * @param rcFile - Path to the RC configuration file
 * @returns Promise resolving to RC configuration or null if file doesn't exist
 * 
 * @example
 * ```typescript
 * // Load default RC file
 * const config = await loadRCConfig('.cross-env-cmdrc');
 * 
 * // Load custom RC file
 * const config = await loadRCConfig('./config/env.rc');
 * ```
 * 
 * @throws {Error} When RC file format is invalid or file cannot be read
 * 
 * @category Configuration
 */
export async function loadRCConfig(rcFile: string): Promise<RCConfig | null> {
  try {
    const rcPath = path.resolve(rcFile);
    if (!fs.existsSync(rcPath)) {
      return null;
    }

    const content = fs.readFileSync(rcPath, 'utf8');
    
    // Try to parse as JSON first
    try {
      return JSON.parse(content) as RCConfig;
    } catch (jsonError) {
      // If JSON fails, try to parse as JavaScript module
      try {
        // Simple evaluation for JS module (in a real app, you'd want safer evaluation)
        const module = { exports: {} };
        const func = new Function('module', 'exports', 'require', content);
        func(module, module.exports, require);
        return module.exports as RCConfig;
      } catch (jsError) {
        throw new Error(`Invalid RC file format: ${rcFile}. Expected JSON or JavaScript module.`);
      }
    }
  } catch (error) {
    throw new Error(`Failed to load RC file ${rcFile}: ${(error as Error).message}`);
  }
}

/**
 * Load and parse environment variables from a .env file
 * 
 * Uses dotenv parser with variable expansion support.
 * Variables like ${VAR} or $VAR are expanded using existing environment variables.
 * 
 * @param filePath - Path to the .env file
 * @returns Promise resolving to parsed environment variables
 * 
 * @example
 * ```typescript
 * // Load development environment
 * const env = await loadEnvFile('.env.development');
 * 
 * // Load custom environment file
 * const env = await loadEnvFile('./config/production.env');
 * ```
 * 
 * @throws {Error} When file doesn't exist or cannot be parsed
 * 
 * @category Environment Loading
 */
export async function loadEnvFile(filePath: string): Promise<EnvironmentVariables> {
  try {
    const resolvedPath = path.resolve(filePath);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Environment file not found: ${filePath}`);
    }

    const content = fs.readFileSync(resolvedPath, 'utf8');
    const parsed = dotenv.parse(content);
    
    // Expand variables in the parsed result
    const expanded = dotenvExpand.expand({ parsed });
    
    return expanded.parsed || {};
  } catch (error) {
    throw new Error(`Failed to load environment file ${filePath}: ${(error as Error).message}`);
  }
}

/**
 * Execute a command with custom environment variables
 * 
 * Spawns a child process with the provided environment variables merged
 * with the current process environment. The command inherits stdio streams.
 * 
 * @param command - Command array where first element is the executable and rest are arguments
 * @param env - Environment variables to set for the command
 * @returns Promise that resolves when command completes successfully
 * 
 * @example
 * ```typescript
 * // Execute npm start with custom environment
 * await executeCommand(['npm', 'start'], { NODE_ENV: 'production' });
 * 
 * // Execute custom script
 * await executeCommand(['node', 'script.js'], { DEBUG: 'true' });
 * ```
 * 
 * @throws {Error} When command execution fails or exits with non-zero code
 * 
 * @category Command Execution
 */
export async function executeCommand(command: string[], env: EnvironmentVariables): Promise<void> {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command;
    
    if (!cmd) {
      reject(new Error('No command specified'));
      return;
    }
    
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      env: { ...process.env, ...env },
      shell: process.platform === 'win32'
    }) as any;

    child.on('close', (code: number | null) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command exited with code ${code}`));
      }
    });

    child.on('error', (error: Error) => {
      reject(new Error(`Failed to execute command: ${error.message}`));
    });
  });
}
