import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('CLI End-to-End Tests', () => {
  let tempDir: string;
  let testRCFile: string;
  let testEnvFile: string;

  beforeAll(async () => {
    // Create temporary directory for tests
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cross-env-cmd-test-'));
    testRCFile = path.join(tempDir, '.cross-env-cmdrc');
    testEnvFile = path.join(tempDir, 'test.env');

    // Create test RC file
    const rcConfig = {
      environments: {
        development: {
          NODE_ENV: 'development',
          LOG_LEVEL: 'debug',
          DATABASE_NAME: 'test_dev'
        },
        staging: {
          NODE_ENV: 'staging',
          LOG_LEVEL: 'info',
          DATABASE_NAME: 'test_staging'
        }
      }
    };
    fs.writeFileSync(testRCFile, JSON.stringify(rcConfig, null, 2));

    // Create test env file
    const envContent = 'API_URL=http://localhost:3000\nSECRET_KEY=test_secret\n';
    fs.writeFileSync(testEnvFile, envContent);
  });

  afterAll(() => {
    // Clean up temporary directory
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  function runCLI(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
    return new Promise((resolve) => {
      const cliPath = path.join(__dirname, '../../../dist/bin/cross-env-cmd.js');
      const child = spawn('node', [cliPath, ...args], {
        cwd: tempDir,
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';

      child.stdout?.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr?.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          code: code || 0,
          stdout,
          stderr
        });
      });
    });
  }

  it('should show help when --help is provided', async () => {
    const result = await runCLI(['--help']);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain('Usage: cross-env-cmd');
    expect(result.stdout).toContain('Options:');
    expect(result.stdout).toContain('Examples:');
  });

  it('should show version when --version is provided', async () => {
    const result = await runCLI(['--version']);

    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe('1.0.0');
  });

  it('should show error when no command is provided', async () => {
    const result = await runCLI([]);

    expect(result.code).toBe(1);
    expect(result.stderr).toContain('Error: No command specified');
  });

  it('should execute simple command', async () => {
    const result = await runCLI(['echo', 'hello']);

    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe('hello');
  });

  it('should load environment from RC file', async () => {
    const testScript = path.join(tempDir, 'test-script.js');
    fs.writeFileSync(testScript, 'console.log(process.env.NODE_ENV, process.env.LOG_LEVEL, process.env.DATABASE_NAME);');
    
    const result = await runCLI([
      '-e', 'development',
      'node', testScript
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe('development debug test_dev');
  });

  it('should load environment from file', async () => {
    const testScript = path.join(tempDir, 'test-script2.js');
    fs.writeFileSync(testScript, 'console.log(process.env.API_URL, process.env.SECRET_KEY);');
    
    const result = await runCLI([
      '-f', 'test.env',
      'node', testScript
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe('http://localhost:3000 test_secret');
  });

  it('should load inline environment variables', async () => {
    const testScript = path.join(tempDir, 'test-script3.js');
    fs.writeFileSync(testScript, 'console.log(process.env.TEST, process.env.DEBUG);');
    
    const result = await runCLI([
      'TEST=inline_value',
      'DEBUG=true',
      'node', testScript
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe('inline_value true');
  });

  it('should combine RC, file, and inline variables with correct priority', async () => {
    const testScript = path.join(tempDir, 'test-script4.js');
    fs.writeFileSync(testScript, `
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('LOG_LEVEL:', process.env.LOG_LEVEL);
      console.log('API_URL:', process.env.API_URL);
      console.log('NEW_VAR:', process.env.NEW_VAR);
    `);
    
    const result = await runCLI([
      '-e', 'staging',
      '-f', 'test.env',
      'LOG_LEVEL=debug', // Override RC value
      'NEW_VAR=inline',
      'node', testScript
    ]);

    expect(result.code).toBe(0);
    const output = result.stdout.trim();
    expect(output).toContain('NODE_ENV: staging');
    expect(output).toContain('LOG_LEVEL: debug'); // Inline should override RC
    expect(output).toContain('API_URL: http://localhost:3000');
    expect(output).toContain('NEW_VAR: inline');
  });

  it('should handle complex example from requirements', async () => {
    const testScript = path.join(tempDir, 'test-script5.js');
    fs.writeFileSync(testScript, `
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('TEST:', process.env.TEST);
      console.log('BETA:', process.env.BETA);
      console.log('API_URL:', process.env.API_URL);
    `);
    
    const result = await runCLI([
      '-e', 'staging',
      '-f', 'test.env',
      'TEST=a',
      'BETA=e',
      'node', testScript
    ]);

    expect(result.code).toBe(0);
    const output = result.stdout.trim();
    expect(output).toContain('NODE_ENV: staging');
    expect(output).toContain('TEST: a');
    expect(output).toContain('BETA: e');
    expect(output).toContain('API_URL: http://localhost:3000');
  });

  it('should show error for non-existent environment', async () => {
    const result = await runCLI([
      '-e', 'nonexistent',
      'echo', 'test'
    ]);

    expect(result.code).toBe(1);
    expect(result.stderr).toContain("Environment 'nonexistent' not found");
  });

  it('should show error for non-existent file', async () => {
    const result = await runCLI([
      '-f', 'nonexistent.env',
      'echo', 'test'
    ]);

    expect(result.code).toBe(1);
    expect(result.stderr).toContain('Environment file not found: nonexistent.env');
  });

  it('should use custom RC file', async () => {
    const customRCFile = path.join(tempDir, 'custom.rc');
    const customConfig = {
      environments: {
        custom: {
          NODE_ENV: 'custom',
          CUSTOM_VAR: 'custom_value'
        }
      }
    };
    fs.writeFileSync(customRCFile, JSON.stringify(customConfig, null, 2));

    const testScript = path.join(tempDir, 'test-script6.js');
    fs.writeFileSync(testScript, 'console.log(process.env.NODE_ENV, process.env.CUSTOM_VAR);');

    const result = await runCLI([
      '--rc', 'custom.rc',
      '-e', 'custom',
      'node', testScript
    ]);

    expect(result.code).toBe(0);
    expect(result.stdout.trim()).toBe('custom custom_value');
  });
});
