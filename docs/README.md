# cross-env-cmd Documentation

This directory contains the documentation for cross-env-cmd, a powerful tool that combines the functionality of cross-env and env-cmd.

## Documentation Structure

- **`index.html`** - Main user guide and getting started documentation
- **`api/`** - Auto-generated API documentation (run `npm run docs` to generate)
- **`examples/`** - Usage examples and configuration samples

## Generating Documentation

### API Documentation

To generate the API documentation from TypeScript source code:

```bash
npm run docs
```

This will:
- Generate TypeDoc documentation from source code
- Create an API index page
- Generate a README for the API documentation

### Serving Documentation Locally

To serve the documentation locally for development:

```bash
npm run docs:serve
```

This will:
- Generate the documentation
- Start a local HTTP server on port 8080
- Open the documentation in your default browser

## Documentation Features

- **Comprehensive API Reference**: Auto-generated from TypeScript with JSDoc comments
- **Interactive Examples**: Code examples with syntax highlighting
- **Type Information**: Complete TypeScript type definitions
- **Search Functionality**: Built-in search across all documentation
- **Responsive Design**: Works on desktop and mobile devices

## Contributing to Documentation

### Adding JSDoc Comments

When adding new functions or modifying existing ones, include comprehensive JSDoc comments:

```typescript
/**
 * Brief description of the function
 * 
 * Longer description with details about what the function does,
 * how it works, and any important considerations.
 * 
 * @param param1 - Description of parameter 1
 * @param param2 - Description of parameter 2
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * const result = myFunction('example', { key: 'value' });
 * console.log(result);
 * ```
 * 
 * @throws {Error} When something goes wrong
 * 
 * @category CategoryName
 */
export function myFunction(param1: string, param2: object): string {
  // Implementation
}
```

### Categories

Use the `@category` tag to organize functions into logical groups:

- `Configuration` - RC file loading and parsing
- `Environment Loading` - Loading variables from various sources  
- `Command Execution` - Running commands with custom environment
- `CLI` - Command line interface and argument parsing
- `Types` - TypeScript type definitions

### Regenerating Documentation

After making changes to the source code or JSDoc comments:

```bash
npm run docs
```

The documentation will be automatically updated with your changes.

## Documentation Standards

- Use clear, concise descriptions
- Include practical examples
- Document all parameters and return values
- Use proper TypeScript types
- Include error conditions with `@throws`
- Organize with appropriate categories