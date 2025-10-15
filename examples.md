# cross-env-cmd Examples

This document provides practical examples of how to use cross-env-cmd in various scenarios.

## Basic Usage

### Using RC Configuration File

Create a `.cross-env-cmdrc` file in your project root:

```json
{
  "development": {
    "NODE_ENV": "development",
    "API_URL": "http://localhost:3000",
    "DEBUG": "true"
  },
  "staging": {
    "NODE_ENV": "staging",
    "API_URL": "https://staging-api.example.com",
    "DEBUG": "false"
  },
  "production": {
    "NODE_ENV": "production",
    "API_URL": "https://api.example.com",
    "DEBUG": "false"
  }
}
```

Then use it:

```bash
# Run with development environment
cross-env-cmd -e development npm start

# Run with staging environment
cross-env-cmd -e staging npm test

# Run with production environment
cross-env-cmd -e production npm run build
```

### Using Environment Files

```bash
# Load from a single .env file
cross-env-cmd -f .env.development npm start

# Load from multiple files (later files override earlier ones)
cross-env-cmd -f .env.development -f .env.local npm start

# Load from custom file path
cross-env-cmd -f ./config/production.env npm run deploy
```

### Using Inline Variables

```bash
# Set individual variables
cross-env-cmd NODE_ENV=production DEBUG=true npm start

# Set multiple variables
cross-env-cmd NODE_ENV=staging API_URL=https://api.example.com npm test

# Combine with other sources
cross-env-cmd -e development DEBUG=true npm start
```

## Advanced Examples

### Complex Environment Setup

```bash
# Load from RC file, additional files, and inline variables
cross-env-cmd -e staging -f .env.local -f .env.override \
  NODE_ENV=production DEBUG=true \
  npm run deploy
```

### Custom RC File

```bash
# Use a custom RC configuration file
cross-env-cmd --rc ./config/my-env.rc -e production npm start
```

### JavaScript RC File

You can also use JavaScript modules for your RC file (`.cross-env-cmdrc.js`):

```javascript
module.exports = {
  development: {
    NODE_ENV: 'development',
    API_URL: process.env.API_URL || 'http://localhost:3000',
    DEBUG: 'true'
  },
  production: {
    NODE_ENV: 'production',
    API_URL: process.env.API_URL || 'https://api.example.com',
    DEBUG: 'false'
  }
};
```

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "cross-env-cmd -e development npm start",
    "test:staging": "cross-env-cmd -e staging npm test",
    "build:prod": "cross-env-cmd -e production npm run build",
    "deploy": "cross-env-cmd -e production -f .env.deploy npm run deploy:script"
  }
}
```

Then use them:

```bash
npm run dev
npm run test:staging
npm run build:prod
npm run deploy
```

## Environment File Examples

### .env.development
```bash
NODE_ENV=development
API_URL=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/myapp_dev
DEBUG=true
LOG_LEVEL=debug
```

### .env.staging
```bash
NODE_ENV=staging
API_URL=https://staging-api.example.com
DATABASE_URL=postgresql://staging-db:5432/myapp_staging
DEBUG=false
LOG_LEVEL=info
```

### .env.production
```bash
NODE_ENV=production
API_URL=https://api.example.com
DATABASE_URL=postgresql://prod-db:5432/myapp_prod
DEBUG=false
LOG_LEVEL=error
```

## Variable Expansion

cross-env-cmd supports variable expansion in .env files:

```bash
# .env file with variable expansion
BASE_URL=https://api.example.com
API_URL=${BASE_URL}/v1
WEBHOOK_URL=${BASE_URL}/webhooks
DEBUG=true
```

## Error Handling

The tool provides clear error messages:

```bash
# Missing environment in RC file
$ cross-env-cmd -e nonexistent npm start
Error: Environment 'nonexistent' not found in .cross-env-cmdrc

# Missing environment file
$ cross-env-cmd -f .env.missing npm start
Error: Environment file not found: .env.missing

# Invalid RC file format
$ cross-env-cmd -e development npm start
Error: Invalid RC file format: .cross-env-cmdrc. Expected JSON or JavaScript module.
```

## Best Practices

1. **Use RC files for environment-specific configurations**
2. **Use .env files for local overrides**
3. **Use inline variables for one-off values**
4. **Keep sensitive data in .env files, not in RC files**
5. **Use descriptive environment names**
6. **Document your environment variables**

## Integration with CI/CD

### GitHub Actions
```yaml
- name: Run tests with staging environment
  run: cross-env-cmd -e staging npm test
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

### Docker
```dockerfile
# Copy environment files
COPY .env.production /app/.env

# Run with production environment
RUN cross-env-cmd -f .env npm run build
```

## Troubleshooting

### Common Issues

1. **Environment variables not loading**: Check file paths and permissions
2. **RC file not found**: Ensure `.cross-env-cmdrc` is in the project root
3. **Invalid JSON**: Validate your RC file JSON syntax
4. **Variable expansion not working**: Ensure variables are defined before use

### Debug Mode

Enable debug mode to see what's happening:

```bash
cross-env-cmd -e development DEBUG=true npm start
```

This will show you which environment variables are being loaded and used.
