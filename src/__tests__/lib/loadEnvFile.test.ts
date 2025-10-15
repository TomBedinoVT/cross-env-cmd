import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { loadEnvFile } from '../../lib/index';

// Mock modules
jest.mock('fs');
jest.mock('dotenv');
jest.mock('dotenv-expand');

const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedDotenv = dotenv as jest.Mocked<typeof dotenv>;
const mockedDotenvExpand = dotenvExpand as jest.Mocked<typeof dotenvExpand>;

describe('loadEnvFile', () => {
  const testFile = 'test.env';
  const testContent = 'NODE_ENV=development\nLOG_LEVEL=debug\n';
  const parsedEnv = {
    NODE_ENV: 'development',
    LOG_LEVEL: 'debug'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and parse .env file successfully', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(testContent);
    mockedDotenv.parse.mockReturnValue(parsedEnv);
    mockedDotenvExpand.expand.mockReturnValue({ parsed: parsedEnv });

    const result = await loadEnvFile(testFile);

    expect(result).toEqual(parsedEnv);
    expect(mockedFs.existsSync).toHaveBeenCalledWith(path.resolve(testFile));
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(path.resolve(testFile), 'utf8');
    expect(mockedDotenv.parse).toHaveBeenCalledWith(testContent);
    expect(mockedDotenvExpand.expand).toHaveBeenCalledWith({ parsed: parsedEnv });
  });

  it('should throw error when file does not exist', async () => {
    mockedFs.existsSync.mockReturnValue(false);

    await expect(loadEnvFile(testFile)).rejects.toThrow(
      'Environment file not found: test.env'
    );
  });

  it('should handle empty parsed result', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(testContent);
    mockedDotenv.parse.mockReturnValue({});
    mockedDotenvExpand.expand.mockReturnValue({ parsed: undefined } as any);

    const result = await loadEnvFile(testFile);

    expect(result).toEqual({});
  });

  it('should throw error when file cannot be read', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('Permission denied');
    });

    await expect(loadEnvFile(testFile)).rejects.toThrow(
      'Failed to load environment file test.env: Permission denied'
    );
  });

  it('should handle dotenv parsing errors', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(testContent);
    mockedDotenv.parse.mockImplementation(() => {
      throw new Error('Invalid format');
    });

    await expect(loadEnvFile(testFile)).rejects.toThrow(
      'Failed to load environment file test.env: Invalid format'
    );
  });
});
