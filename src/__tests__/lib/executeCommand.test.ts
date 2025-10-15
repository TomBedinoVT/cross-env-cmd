import { spawn } from 'child_process';
import { executeCommand } from '../../lib/index';

// Mock child_process
jest.mock('child_process');
const mockedSpawn = spawn as jest.MockedFunction<typeof spawn>;

describe('executeCommand', () => {
  let mockChild: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockChild = {
      on: jest.fn(),
      stdio: 'inherit',
      env: {},
      shell: false
    };
    
    mockedSpawn.mockReturnValue(mockChild);
  });

  it('should execute command successfully', async () => {
    const command = ['echo', 'hello'];
    const env = { TEST_VAR: 'test_value' };

    // Mock successful execution
    mockChild.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'close') {
        setTimeout(() => callback(0), 0);
      }
    });

    await executeCommand(command, env);

    expect(mockedSpawn).toHaveBeenCalledWith('echo', ['hello'], {
      stdio: 'inherit',
      env: expect.objectContaining({ TEST_VAR: 'test_value' }),
      shell: process.platform === 'win32'
    });
  });

  it('should reject when command exits with non-zero code', async () => {
    const command = ['false'];
    const env = {};

    mockChild.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'close') {
        setTimeout(() => callback(1), 0);
      }
    });

    await expect(executeCommand(command, env)).rejects.toThrow(
      'Command exited with code 1'
    );
  });

  it('should reject when command fails to start', async () => {
    const command = ['nonexistent-command'];
    const env = {};

    mockChild.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'error') {
        setTimeout(() => callback(new Error('Command not found')), 0);
      }
    });

    await expect(executeCommand(command, env)).rejects.toThrow(
      'Failed to execute command: Command not found'
    );
  });

  it('should merge environment variables with process.env', async () => {
    const originalEnv = process.env;
    process.env['EXISTING_VAR'] = 'existing_value';
    
    const command = ['echo', 'test'];
    const env = { NEW_VAR: 'new_value' };

    mockChild.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'close') {
        setTimeout(() => callback(0), 0);
      }
    });

    await executeCommand(command, env);

    expect(mockedSpawn).toHaveBeenCalledWith('echo', ['test'], {
      stdio: 'inherit',
      env: expect.objectContaining({
        EXISTING_VAR: 'existing_value',
        NEW_VAR: 'new_value'
      }),
      shell: process.platform === 'win32'
    });

    process.env = originalEnv;
  });

  it('should use shell on Windows', async () => {
    const originalPlatform = process.platform;
    Object.defineProperty(process, 'platform', {
      value: 'win32',
      configurable: true
    });

    const command = ['echo', 'test'];
    const env = {};

    mockChild.on.mockImplementation((event: string, callback: Function) => {
      if (event === 'close') {
        setTimeout(() => callback(0), 0);
      }
    });

    await executeCommand(command, env);

    expect(mockedSpawn).toHaveBeenCalledWith('echo', ['test'], {
      stdio: 'inherit',
      env: expect.any(Object),
      shell: true
    });

    Object.defineProperty(process, 'platform', {
      value: originalPlatform,
      configurable: true
    });
  });
});
