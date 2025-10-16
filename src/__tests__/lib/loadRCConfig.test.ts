import * as fs from 'fs';
import * as path from 'path';
import { loadRCConfig } from '../../lib/index';
import { RCConfig } from '../../types';

// Mock fs module
jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('loadRCConfig', () => {
  const testRCFile = '.cross-env-cmdrc';
  const testConfig: RCConfig = {
    environments: {
      development: {
        NODE_ENV: 'development',
        LOG_LEVEL: 'debug'
      },
      production: {
        NODE_ENV: 'production',
        LOG_LEVEL: 'error'
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load and parse JSON RC file successfully', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(JSON.stringify(testConfig));

    const result = await loadRCConfig(testRCFile);

    expect(result).toEqual(testConfig);
    expect(mockedFs.existsSync).toHaveBeenCalledWith(path.resolve(testRCFile));
    expect(mockedFs.readFileSync).toHaveBeenCalledWith(path.resolve(testRCFile), 'utf8');
  });

  it('should return null when RC file does not exist', async () => {
    mockedFs.existsSync.mockReturnValue(false);

    const result = await loadRCConfig(testRCFile);

    expect(result).toBeNull();
    expect(mockedFs.readFileSync).not.toHaveBeenCalled();
  });

  it('should load and parse JavaScript RC file successfully', async () => {
    const jsConfig = `module.exports = ${JSON.stringify(testConfig)};`;
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(jsConfig);

    const result = await loadRCConfig(testRCFile);

    expect(result).toEqual(testConfig);
  });

  it('should throw error for invalid JSON format', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('invalid json {');

    await expect(loadRCConfig(testRCFile)).rejects.toThrow(
      'Invalid RC file format: .cross-env-cmdrc. Expected JSON or JavaScript module.'
    );
  });

  it('should throw error for invalid JavaScript format', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue('invalid javascript syntax');

    await expect(loadRCConfig(testRCFile)).rejects.toThrow(
      'Invalid RC file format: .cross-env-cmdrc. Expected JSON or JavaScript module.'
    );
  });

  it('should throw error when file cannot be read', async () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockImplementation(() => {
      throw new Error('Permission denied');
    });

    await expect(loadRCConfig(testRCFile)).rejects.toThrow(
      'Failed to load RC file .cross-env-cmdrc: Permission denied'
    );
  });
});
