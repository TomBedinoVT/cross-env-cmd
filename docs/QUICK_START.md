# Quick Start Guide - Documentation System

## 🚀 Getting Started

The cross-env-cmd project now includes a comprehensive documentation system that automatically generates API documentation from TypeScript source code.

## 📋 Prerequisites

Make sure you have the following installed:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🛠️ Installation

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Generate documentation**:
   ```bash
   npm run docs
   ```

3. **Serve documentation locally** (optional):
   ```bash
   npm run docs:serve
   ```

## 📚 Available Commands

### Generate Documentation
```bash
npm run docs
```
- Generates TypeDoc API documentation from source code
- Creates navigation and index files
- Provides colored console output with progress indicators

### Serve Documentation Locally
```bash
npm run docs:serve
```
- Generates documentation (if not already generated)
- Starts local HTTP server on port 8080
- Opens documentation in your default browser

## 📖 Documentation Structure

```
docs/
├── api/                    # Auto-generated API documentation
│   ├── index.html         # Main API documentation page
│   ├── modules.html       # Module index
│   ├── functions/         # Function documentation
│   ├── interfaces/        # Interface documentation
│   └── assets/           # CSS, JS, and other assets
├── examples.md           # Usage examples and configuration
├── README.md            # Documentation system guide
├── DOCUMENTATION.md     # Detailed system explanation
└── SUMMARY.md           # Complete system summary
```

## 🔍 What's Included

### API Documentation
- **Complete Type Coverage**: All TypeScript types and interfaces
- **Function Documentation**: Detailed descriptions with examples
- **Parameter Documentation**: All parameters with types and descriptions
- **Return Value Documentation**: Clear return type information
- **Error Documentation**: Error conditions with `@throws` tags
- **Category Organization**: Functions grouped by logical categories

### Interactive Features
- **Search Functionality**: Built-in search across all documentation
- **Navigation**: Easy navigation between modules and functions
- **Code Examples**: Syntax-highlighted code examples
- **Responsive Design**: Works on desktop and mobile devices

### Categories
- **Configuration**: RC file loading and parsing
- **Environment Loading**: Loading variables from various sources
- **Command Execution**: Running commands with custom environment
- **CLI**: Command line interface and argument parsing
- **Types**: TypeScript type definitions

## 🎯 Key Features

### Automatic Generation
- Documentation is generated directly from TypeScript source code
- JSDoc comments are processed to create rich documentation
- Type information is automatically extracted and displayed

### Professional Appearance
- Clean, modern design
- Responsive layout for all devices
- Syntax highlighting for code examples
- Interactive navigation and search

### Easy Maintenance
- No manual documentation updates needed
- Documentation stays in sync with code changes
- Simple commands for generation and serving

## 📝 Writing Documentation

### Adding JSDoc Comments
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

### Using Categories
Organize functions with the `@category` tag:
- `@category Configuration`
- `@category Environment Loading`
- `@category Command Execution`
- `@category CLI`
- `@category Types`

## 🔧 Configuration

### TypeDoc Configuration
The TypeDoc configuration is in `typedoc.json` and includes:
- Entry points for documentation generation
- Output directory configuration
- Theme and styling options
- Category organization
- Exclusion rules for test files

### Script Configuration
The documentation generation script is in `scripts/generate-docs.js` and provides:
- Colored console output
- Progress indicators
- Error handling
- Additional file generation

## 🚀 Usage Examples

### Basic Usage
```bash
# Generate documentation
npm run docs

# Serve locally
npm run docs:serve
```

### Development Workflow
1. Write code with JSDoc comments
2. Run `npm run docs` to generate documentation
3. Review documentation in browser
4. Commit changes to version control

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Generate Documentation
  run: npm run docs
  
- name: Deploy Documentation
  run: # Deploy to GitHub Pages, Netlify, etc.
```

## 🐛 Troubleshooting

### Common Issues
1. **Documentation not generating**: Check TypeDoc configuration and dependencies
2. **Missing functions**: Ensure functions are exported and have JSDoc comments
3. **Broken examples**: Test all code examples in documentation
4. **Styling issues**: Check CSS files and theme configuration

### Debug Mode
```bash
# Run TypeDoc directly with verbose output
npx typedoc --verbose

# Check TypeDoc configuration
npx typedoc --help
```

## 📚 Additional Resources

- [JSDoc Documentation](https://jsdoc.app/)
- [TypeDoc Documentation](https://typedoc.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🎉 Conclusion

The documentation system provides a professional, comprehensive, and maintainable way to document the cross-env-cmd project. It automatically generates up-to-date API documentation from TypeScript source code, making it easy for developers to understand and use the library.

**Key Benefits:**
- ✅ Easy to use with simple npm commands
- ✅ Always current with automatic generation from source
- ✅ Comprehensive with complete API coverage
- ✅ Professional with clean, interactive documentation
- ✅ Maintainable with minimal manual intervention required

Start using the documentation system today with `npm run docs`!
