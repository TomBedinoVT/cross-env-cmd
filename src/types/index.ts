/**
 * Configuration interface for RC files (.cross-env-cmdrc)
 * Contains environments object with environment names mapped to their respective environment variables
 * 
 * @example
 * ```json
 * {
 *   "environments": {
 *     "development": {
 *       "NODE_ENV": "development",
 *       "API_URL": "http://localhost:3000"
 *     },
 *     "production": {
 *       "NODE_ENV": "production",
 *       "API_URL": "https://api.example.com"
 *     }
 *   }
 * }
 * ```
 */
export interface RCConfig {
  /** Environments object containing environment configurations */
  environments: {
    /** Environment name mapped to environment variables */
    [environment: string]: {
      /** Environment variable key-value pairs */
      [key: string]: string;
    };
  };
}

/**
 * Options for loading environment variables from various sources
 * 
 * @category Configuration
 */
export interface LoadEnvironmentOptions {
  /** Environment name to load from RC configuration file */
  environment?: string | undefined;
  /** 
   * Additional environment files to load (in order of precedence)
   * Later files override earlier ones
   */
  files?: string[];
  /** RC configuration file path (default: '.cross-env-cmdrc') */
  rcFile?: string;
  /** 
   * Inline environment variables (highest precedence)
   * These override all other sources
   */
  inlineVars?: Record<string, string>;
}

/**
 * Parsed command line arguments structure
 * 
 * @category CLI
 */
export interface ParsedArgs {
  /** Environment name from -e/--env flag */
  environment: string | null;
  /** Environment files from -f/--file flags */
  files: string[];
  /** RC configuration file path from --rc flag */
  rcFile: string;
  /** Inline environment variables from command line */
  envVars: Record<string, string>;
  /** Command and arguments to execute */
  command: string[];
}

/**
 * Environment variables object type
 * 
 * @category Types
 */
export interface EnvironmentVariables {
  /** Environment variable key-value pairs */
  [key: string]: string;
}
