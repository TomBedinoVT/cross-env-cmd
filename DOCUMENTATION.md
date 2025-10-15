# Documentation System for cross-env-cmd

This document explains how the documentation system works and how to use it.

## Overview

The cross-env-cmd project includes a comprehensive documentation system that automatically generates API documentation from TypeScript source code using JSDoc comments and TypeDoc.

## Features

- **Automatic API Documentation**: Generated from TypeScript source code
- **Interactive Examples**: Code examples with syntax highlighting
- **Type Information**: Complete TypeScript type definitions
- **Search Functionality**: Built-in search across all documentation
- **Responsive Design**: Works on desktop and mobile devices
- **Category Organization**: Functions organized by logical categories

## Commands

### Generate Documentation

```bash
npm run docs
```

This command:
- Generates TypeDoc API documentation from source code
- Creates an API index page with navigation
- Generates a README for the API documentation
- Provides colored output with progress indicators

### Serve Documentation Locally

```bash
npm run docs:serve
```

This command:
- Generates the documentation (if not already generated)
- Starts a local HTTP server on port 8080
- Opens the documentation in your default browser

## Documentation Structure

```
docs/
├── api/                    # Auto-generated API documentation
│   ├── index.html         # Main API documentation page
│   ├── modules.html       # Module index
│   ├── functions/         # Function documentation
│   ├── interfaces/        # Interface documentation
│   ├── assets/           # CSS, JS, and other assets
│   └── README.md         # API documentation README
├── examples.md           # Usage examples and configuration
├── README.md            # Documentation system guide
└── DOCUMENTATION.md     # This file
```

## Writing Documentation

### JSDoc Comments

All public functions, interfaces, and types should have comprehensive JSDoc comments:

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

- **Configuration**: RC file loading and parsing
- **Environment Loading**: Loading variables from various sources
- **Command Execution**: Running commands with custom environment
- **CLI**: Command line interface and argument parsing
- **Types**: TypeScript type definitions

### Examples

Include practical examples in your JSDoc comments:

```typescript
/**
 * @example
 * ```typescript
 * // Load from RC file environment
 * const env = await loadEnvironment({ environment: 'staging' });
 * 
 * // Load from multiple files
 * const env = await loadEnvironment({ 
 *   files: ['.env.development', '.env.local'] 
 * });
 * ```
 */
```

## Configuration

### TypeDoc Configuration

The TypeDoc configuration is in `typedoc.json`:

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs/api",
  "name": "cross-env-cmd",
  "includeVersion": true,
  "excludePrivate": true,
  "excludeProtected": true,
  "excludeExternals": true,
  "readme": "README.md",
  "theme": "default",
  "sort": ["source-order"],
  "categorizeByGroup": true,
  "defaultCategory": "Other",
  "categoryOrder": [
    "Configuration",
    "Environment Loading",
    "Command Execution", 
    "CLI",
    "Types",
    "*"
  ]
}
```

### Script Configuration

The documentation generation script is in `scripts/generate-docs.js` and includes:

- Colored console output
- Progress indicators
- Error handling
- Additional file generation (index, README)

## Best Practices

### Documentation Writing

1. **Be Clear and Concise**: Write clear, easy-to-understand descriptions
2. **Include Examples**: Provide practical examples for complex functions
3. **Document Parameters**: Describe all parameters and their types
4. **Document Return Values**: Explain what functions return
5. **Document Errors**: Use `@throws` for error conditions
6. **Use Categories**: Organize functions with appropriate categories

### Code Organization

1. **Export Everything**: Make sure all public APIs are exported
2. **Use TypeScript**: Leverage TypeScript types for better documentation
3. **Consistent Naming**: Use consistent naming conventions
4. **Group Related Functions**: Keep related functions together

### Maintenance

1. **Update Documentation**: Keep documentation in sync with code changes
2. **Test Examples**: Ensure all code examples work
3. **Review Regularly**: Periodically review and improve documentation
4. **Version Control**: Include documentation in version control

## Troubleshooting

### Common Issues

1. **Documentation Not Generating**: Check TypeDoc configuration and dependencies
2. **Missing Functions**: Ensure functions are exported and have JSDoc comments
3. **Broken Examples**: Test all code examples in documentation
4. **Styling Issues**: Check CSS files and theme configuration

### Debug Mode

To debug documentation generation:

```bash
# Run TypeDoc directly with verbose output
npx typedoc --verbose

# Check TypeDoc configuration
npx typedoc --help
```

## Contributing

When contributing to the documentation:

1. **Follow JSDoc Standards**: Use proper JSDoc syntax
2. **Test Examples**: Ensure all examples work
3. **Update Categories**: Use appropriate categories for new functions
4. **Review Changes**: Test documentation generation after changes

## Resources

- [JSDoc Documentation](https://jsdoc.app/)
- [TypeDoc Documentation](https://typedoc.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Support

If you encounter issues with the documentation system:

1. Check the troubleshooting section above
2. Review the TypeDoc configuration
3. Ensure all dependencies are installed
4. Check the console output for error messages
