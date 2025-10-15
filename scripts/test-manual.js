#!/usr/bin/env node

/**
 * Script de test manuel pour vérifier le fonctionnement de cross-env-cmd
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CLI_PATH = path.join(__dirname, '../dist/bin/cross-env-cmd.js');

function runCommand(args) {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [CLI_PATH, ...args], {
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
      resolve({ code, stdout, stderr });
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function runTests() {
  console.log('🧪 Running manual tests for cross-env-cmd...\n');

  const tests = [
    {
      name: 'Help command',
      args: ['--help'],
      expectedCode: 0,
      expectedOutput: 'Usage: cross-env-cmd'
    },
    {
      name: 'Version command',
      args: ['--version'],
      expectedCode: 0,
      expectedOutput: '1.0.0'
    },
    {
      name: 'No command error',
      args: [],
      expectedCode: 1,
      expectedOutput: 'No command specified'
    },
    {
      name: 'Basic echo command',
      args: ['echo', 'Hello World'],
      expectedCode: 0,
      expectedOutput: 'Hello World'
    },
    {
      name: 'Environment variable',
      args: ['TEST=value', 'node', '-e', 'console.log(process.env.TEST)'],
      expectedCode: 0,
      expectedOutput: 'value'
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}...`);
      const result = await runCommand(test.args);
      
      if (result.code === test.expectedCode && 
          (test.expectedOutput === undefined || 
           result.stdout.includes(test.expectedOutput) || 
           result.stderr.includes(test.expectedOutput))) {
        console.log(`✅ ${test.name} - PASSED`);
        passed++;
      } else {
        console.log(`❌ ${test.name} - FAILED`);
        console.log(`   Expected code: ${test.expectedCode}, got: ${result.code}`);
        console.log(`   Expected output: ${test.expectedOutput}`);
        console.log(`   Got stdout: ${result.stdout}`);
        console.log(`   Got stderr: ${result.stderr}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - ERROR: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All tests passed!');
  }
}

// Vérifier que le CLI est compilé
if (!fs.existsSync(CLI_PATH)) {
  console.error('❌ CLI not found. Please run "npm run build" first.');
  process.exit(1);
}

runTests().catch(console.error);
