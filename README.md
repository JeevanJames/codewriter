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
CodeWriter allows some options to be specified in the constructor to customize its behavior.
All options are optional and have defaults.

| Option | Type | Default | Description |
|---------|---------|---------|---------|
|**indentSize**|`number`|4|Size of the code indentation, in number of spaces|
|**initialCode**|Multiple types|-|Code to initialize the CodeWriter with. Could be a `string`, `string[]` or another `CodeWriter` instance.|
|**singleLineComment**|`function`|-|Function that accepts a `CodeWriter` instance and a comment string and writes out a single-line comment in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `comment` method.|
|**multiLineComment**|`function`|-|Function that accepts a `CodeWriter` instance and a string array containing multiple comments, and writes out  a multi-line comment in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `multiLineComment` method.|
|**startBlock**|`function`|-|Function that accepts a `CodeWriter` instance and an optional code, and writes out a opening block in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `startBlock` method.|
|**endBlock**|`function`|-|Function that accepts a `CodeWriter` instance and an optional code, and writes out a closing block in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `endBlock` method.|

Examples are shown below (for generating JavaScript code):
```js
// Outputs this type of
// comment when the CodeWriter.comment
// method is called.
options.singleLineComment = (writer, comment) => {
    writer.line(`// ${comment}`);
};

/*
 * Outputs this type of
 * comment when the CodeWriter.multiLineComment
 * method is called.
 */
options.multiLineComment = (writer, comments) => {
    writer.line('/*')
        .repeat(comments || [], (cw, comment) => {
            cw.line(` * ${comment}`);
        })
        .line(' */');
};

options.startBlock = (writer, code) => {
    writer.inline(`${code} `, !!code).inline('{').done()
        .indent();
};

options.endBlock = (writer, code) => {
    writer.unindent('}');
};
```

## Examples
[Empty C# console program](docs/example-csharp-empty-console.md)

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
