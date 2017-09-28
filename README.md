# CodeWriter
CodeWriter is a fluent Node library that can be used to generate code blocks. It is typically used by code generation tools to simplify the task of building the generated code.

CodeWriter is similar to concepts like `StringBuilder`'s or `StringWriter`'s in other languages. Instead of using string concatenation to build the generated code, CodeWriter adds support for code-specific concepts like indentation and language-specific comments.

## Installation
```sh
npm install --save-dev codewriter
```

## Usage

### JavaScript
```js
const CodeWriter = require('codewriter');

const options = { indentSize: 4 };
const writer = new CodeWriter(options);
// Use CodeWriter methods to build the code
const code = writer.toCode();
```

### Typescript
CodeWriter ships with a Typescript definition file.
```ts
import { CodeWriter, CodeWriterOptions } from 'codewriter';

const options: CodeWriterOptions = { indentSize: 4 };
const writer = new CodeWriter(options);
// Use CodeWriter methods to build the code
const code: string = writer.toCode();
```

## Options
CodeWriter allows some options to be specified in the constructor to customize how the code is generated.

[Options reference](docs/options.md)

[Sample options for generating JavaScript code](docs/options-example.md)

## Examples
[Generate empty C# console program](docs/example-csharp-empty-console.md)

## API reference
[JSDoc Documentation](docs/API.md)

You can view the source code comments directly from [GitHub](https://github.com/JeevanJames/codewriter/blob/master/src/index.ts).

If you are using Typescript, you can install the package locally to get code completion support from supported IDE's and editors.

## Building the code
```sh
# Clone repo from GitHub
git clone https://github.com/JeevanJames/codewriter.git .

# Install dependencies
npm install

# Build code
npm run build

# Lint code
npm run lint

# Continuously watch for code changes and build
npm run watch
```
