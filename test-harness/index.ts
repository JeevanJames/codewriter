import { CodeWriter, CodeWriterOptions, OptionsLibrary } from '../src';

const options: CodeWriterOptions = OptionsLibrary.cLanguageFamily({
    braceLayout: 'nextLine'
});
options.indentSize = 8;
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
