# CodeWriter options
All options properties are optional and have defaults. Click [here](options-example.md) to see a sample options set-up for generating JavaScript code.

The framework also provides an `OptionsLibrary` class that has methods and properties to generate pre-defined options specific to common languages and language familities.

## indentSize
Type: `number`

Default: `4`

Number of spaces a tab is equal to.

Currently, CodeWriter only supports indentation with spaces. Support for tab indentation is in the works.

## initialCode
Type: `string | string[] | CodeWriter`

Code to initialize the CodeWriter.

This could be a single line of code (`string`), multiple lines of code (`string[]`) or another `CodeWriter` instance.

## singleLineComment
Type: `(writer: CodeWriter, comment: string) => void`

Specifies how to generate a language-specific single line comment.

## multiLineComment
Type: `(writer: CodeWriter, comments: string[]) => void`

Specifies how to generate a language-specific multi-line comment.

## docComment
Type: `(writer: CodeWriter, comments: string[]) => void`

Specifies how to generate a language-specific document comment.

## startBlock
Type: `(writer: CodeWriter, code?: string) => void`

Specifies how to generate a language-specific starting code block.

## endBlock
Type: `(writer: CodeWriter, code?: string) => void`

Specifies how to generate a language-specific ending code block.
