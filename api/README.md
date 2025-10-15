# cross-env-cmd API Documentation

This directory contains the automatically generated API documentation for cross-env-cmd.

## Overview

cross-env-cmd is a powerful tool that combines the functionality of cross-env and env-cmd, allowing you to:

- Load environment variables from RC configuration files
- Load environment variables from multiple .env files
- Set inline environment variables
- Execute commands with the loaded environment

## Quick Start

```bash
# Install
npm install cross-env-cmd

# Use with environment from RC file
cross-env-cmd -e staging npm start

# Use with environment files
cross-env-cmd -f .env.development -f .env.local npm test

# Use with inline variables
cross-env-cmd NODE_ENV=production DEBUG=true npm run build
```

## API Categories

- **Configuration**: RC file loading and parsing
- **Environment Loading**: Loading variables from various sources
- **Command Execution**: Running commands with custom environment
- **CLI**: Command line interface and argument parsing
- **Types**: TypeScript type definitions

## Documentation Structure

- `modules/index.html` - Main API documentation
- `classes/` - Class documentation (if any)
- `interfaces/` - Interface documentation
- `functions/` - Function documentation

## Examples

See the [examples directory](../../examples/) for practical usage examples.

## Contributing

To regenerate this documentation:

```bash
npm run docs
```

To serve the documentation locally:

```bash
npm run docs:serve
```
