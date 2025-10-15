import { parseArgs } from '../../bin/cross-env-cmd';

// Mock process.argv
const originalArgv = process.argv;

describe('parseArgs', () => {
  beforeEach(() => {
    process.argv = ['node', 'cross-env-cmd'];
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  it('should parse basic command without options', () => {
    process.argv = ['node', 'cross-env-cmd', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse environment option', () => {
    process.argv = ['node', 'cross-env-cmd', '-e', 'staging', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: 'staging',
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse long environment option', () => {
    process.argv = ['node', 'cross-env-cmd', '--env', 'production', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: 'production',
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse single file option', () => {
    process.argv = ['node', 'cross-env-cmd', '-f', 'test.env', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: ['test.env'],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse multiple file options', () => {
    process.argv = ['node', 'cross-env-cmd', '-f', 'test.env', '-f', 'prod.env', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: ['test.env', 'prod.env'],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse long file option', () => {
    process.argv = ['node', 'cross-env-cmd', '--file', 'test.env', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: ['test.env'],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse RC file option', () => {
    process.argv = ['node', 'cross-env-cmd', '--rc', 'custom.rc', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: [],
      rcFile: 'custom.rc',
      envVars: {},
      command: ['npm', 'start']
    });
  });

  it('should parse environment variables', () => {
    process.argv = ['node', 'cross-env-cmd', 'TEST=value', 'DEBUG=true', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {
        TEST: 'value',
        DEBUG: 'true'
      },
      command: ['npm', 'start']
    });
  });

  it('should parse environment variables with complex values', () => {
    process.argv = ['node', 'cross-env-cmd', 'DATABASE_URL=postgres://user:pass@localhost:5432/db', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {
        DATABASE_URL: 'postgres://user:pass@localhost:5432/db'
      },
      command: ['npm', 'start']
    });
  });

  it('should parse complex example', () => {
    process.argv = [
      'node', 'cross-env-cmd',
      '-e', 'staging',
      '-f', 'test.env',
      '-f', 'prod.env',
      'TEST=a',
      'BETA=e',
      'npm', 'run', 'deploy'
    ];

    const result = parseArgs();

    expect(result).toEqual({
      environment: 'staging',
      files: ['test.env', 'prod.env'],
      rcFile: '.cross-env-cmdrc',
      envVars: {
        TEST: 'a',
        BETA: 'e'
      },
      command: ['npm', 'run', 'deploy']
    });
  });

  it('should handle empty command', () => {
    process.argv = ['node', 'cross-env-cmd', '-e', 'staging'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: 'staging',
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {},
      command: []
    });
  });

  it('should ignore options that start with dash in env vars', () => {
    process.argv = ['node', 'cross-env-cmd', 'TEST=value', '--some-flag', 'npm', 'start'];

    const result = parseArgs();

    expect(result).toEqual({
      environment: null,
      files: [],
      rcFile: '.cross-env-cmdrc',
      envVars: {
        TEST: 'value'
      },
      command: ['--some-flag', 'npm', 'start']
    });
  });
});
