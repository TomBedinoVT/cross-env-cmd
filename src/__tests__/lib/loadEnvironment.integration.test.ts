import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { loadEnvironment } from '../../lib/index';

describe('loadEnvironment Integration Tests', () => {
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

  it('should load environment from RC file', async () => {
    const result = await loadEnvironment({
      environment: 'development',
      rcFile: testRCFile
    });

    expect(result).toEqual(expect.objectContaining({
      NODE_ENV: 'development',
      LOG_LEVEL: 'debug',
      DATABASE_NAME: 'test_dev'
    }));
  });

  it('should load environment from file', async () => {
    const result = await loadEnvironment({
      files: [testEnvFile]
    });

    expect(result).toEqual(expect.objectContaining({
      API_URL: 'http://localhost:3000',
      SECRET_KEY: 'test_secret'
    }));
  });

  it('should apply inline variables with highest priority', async () => {
    const result = await loadEnvironment({
      environment: 'staging',
      files: [testEnvFile],
      rcFile: testRCFile,
      inlineVars: {
        LOG_LEVEL: 'debug', // Override RC value
        NEW_VAR: 'inline_value'
      }
    });

    expect(result).toEqual(expect.objectContaining({
      NODE_ENV: 'staging',
      LOG_LEVEL: 'debug', // Inline value should override RC value
      DATABASE_NAME: 'test_staging',
      API_URL: 'http://localhost:3000',
      SECRET_KEY: 'test_secret',
      NEW_VAR: 'inline_value'
    }));
  });

  it('should throw error when environment not found in RC', async () => {
    await expect(loadEnvironment({
      environment: 'nonexistent',
      rcFile: testRCFile
    })).rejects.toThrow(
      "Environment 'nonexistent' not found"
    );
  });

  it('should throw error when file not found', async () => {
    await expect(loadEnvironment({
      files: ['nonexistent.env']
    })).rejects.toThrow(
      'Environment file not found: nonexistent.env'
    );
  });
});
