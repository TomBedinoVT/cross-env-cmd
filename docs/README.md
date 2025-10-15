# cross-env-cmd Documentation

This directory contains the complete documentation for cross-env-cmd, a powerful tool that combines the functionality of cross-env and env-cmd.

## 📚 Documentation Structure

- **`index.html`** - Main API documentation page (auto-generated)
- **`modules.html`** - Module index and navigation
- **`functions/`** - Individual function documentation
- **`interfaces/`** - TypeScript interface documentation
- **`assets/`** - CSS, JavaScript, and other assets
- **`README.md`** - This file

## 🚀 Quick Start

### Generate Documentation
```bash
npm run docs
```

### Serve Documentation Locally
```bash
npm run docs:serve
```

## 📖 What's Included

### API Documentation
- **Complete Type Coverage**: All TypeScript types and interfaces documented
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

## 🔧 How It Works

1. **Source Code Analysis**: TypeDoc analyzes TypeScript source files
2. **JSDoc Processing**: Extracts JSDoc comments and examples
3. **Type Information**: Processes TypeScript type definitions
4. **HTML Generation**: Creates interactive HTML documentation
5. **Asset Creation**: Generates CSS, JavaScript, and other assets

## 📝 Writing Documentation

### JSDoc Comments
```typescript
/**
 * Brief description of the function
 * 
 * @param param1 - Description of parameter 1
 * @param param2 - Description of parameter 2
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * const result = myFunction('example', { key: 'value' });
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
Use the `@category` tag to organize functions:
- `@category Configuration`
- `@category Environment Loading`
- `@category Command Execution`
- `@category CLI`
- `@category Types`

## 🎯 Benefits

### For Developers
- **Easy to Use**: Simple `npm run docs` command
- **Always Up-to-Date**: Documentation generated from source code
- **Comprehensive**: Covers all public APIs
- **Interactive**: Search and navigation features

### For Users
- **Complete Reference**: All functions and types documented
- **Practical Examples**: Real-world usage examples
- **Easy Navigation**: Organized by categories
- **Searchable**: Find information quickly

### For Maintenance
- **Automated**: No manual documentation updates needed
- **Consistent**: Follows JSDoc standards
- **Version Controlled**: Documentation in sync with code
- **Extensible**: Easy to add new features

## 🔄 Regenerating Documentation

After making changes to the source code or JSDoc comments:

```bash
npm run docs
```

The documentation will be automatically updated with your changes.

## 🌐 Serving Documentation

### Local Development
```bash
npm run docs:serve
```

### Production Deployment
The documentation can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

## 📚 Additional Resources

- [JSDoc Documentation](https://jsdoc.app/)
- [TypeDoc Documentation](https://typedoc.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 🎉 Conclusion

The documentation system provides a professional, comprehensive, and maintainable way to document the cross-env-cmd project. It automatically generates up-to-date API documentation from TypeScript source code, making it easy for developers to understand and use the library.

**Key Features:**
- ✅ Automatic generation from TypeScript source
- ✅ Interactive search and navigation
- ✅ Comprehensive API coverage
- ✅ Professional appearance
- ✅ Easy maintenance and updates