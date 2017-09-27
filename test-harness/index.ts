import { CodeWriter } from '../src';
import { CodeWriterOptions } from '../src/code-writer-options';

const options: CodeWriterOptions = {
    indentSize: 4,
    singleLineComment: (cw, comment) => {
        cw.line(`// ${comment || ''}`);
    },
    multiLineComment: (cw, comments) => {
        cw.line(`/*`)
            .repeat(comments || [], (writer, comment) => writer.line(` * ${comment || ''}`))
            .line(` */`);
    },
    startBlock: (cw, code) => {
        if (code) {
            cw.line(code);
        }
        cw.line(`{`);
        cw.indent();
    },
    endBlock: (cw, code) => {
        cw.unindent(`}`);
    }
};
const writer = new CodeWriter(options);

writer
    .multiLineComment(
        `Automatically generated using CodeWriter`,
        `Copyright (c) 2017 Jeevan James`,
        `All right reserved`
    )
    .blank()
    .line(`using System;`)
    .blank()
    .startBlock(`namespace ConsoleProgram`)
        .startBlock(`internal static class Program`)
            .startBlock(`private static void Main(string[] args)`)
                .comment(`Your code goes here`)
            .endBlock()
        .endBlock()
    .endBlock();

const code: string = writer.toCode();
console.log(code);
