import { CodeWriter, CodeWriterOptions } from '../src';

const options: CodeWriterOptions = {
    indentSize: 4,
    singleLineComment:c => '// ' + c
};
const writer = new CodeWriter(options);

writer
    .comment(`Automatically generated using CodeWriter`)
    .blank()
    .line(`using System;`)
    .blank()
    .line(`namespace ConsoleProgram`)
    .line(`{`)
    .indent()
        .line(`internal static class Program`)
        .line(`{`)
        .indent()
            .line(`private static void Main(string[] args)`)
            .line(`{`)
            .indent()
                .comment(`Your code goes here`)
            .unindent(`}`)
        .unindent(`}`)
    .unindent(`}`);

const code: string = writer.toCode();
console.log(code);
