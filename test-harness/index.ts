import { CodeWriter, CodeWriterOptions, OptionsLibrary } from '../src';

const options: CodeWriterOptions = OptionsLibrary.csharp;
options.indentType = 'tabs';
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
            .docComment(`Application entry-point.`)
            .startBlock(`private static void Main(string[] args)`)
                .if(1 > 5)
                    .line(`This code should not be seen`)
                    .blank()
                    .inline(`x`).inline(`y`).done()
                .endIf()
                .comment(`Your code goes here`)
            .endBlock()
        .endBlock()
    .endBlock();

const code: string = writer.toCode();
console.log(code);
console.log('\tblah');
