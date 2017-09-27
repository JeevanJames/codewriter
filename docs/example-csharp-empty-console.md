# Example - Empty C# console program

## Code to generate
```cs
/*
   Automatically generated using CodeWriter
   Copyright (c) 2017
   All rights reserved
*/

using System;

namespace ConsoleProgram
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            // Your code goes here
        }
    }
}
```

## Without language-specific options configured
```ts
import { CodeWriter } from 'codewriter';

const writer = new CodeWriter();
writer
    .line(`/*`)
    .line(`   Automatically generated using CodeWriter`)
    .line(`   Copyright (c) 2017`)
    .line(`   All rights reserved.`)
    .line(`*/`)
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
                .line(`// Your code goes here`)
            .unindent(`}`)
        .unindent(`}`)
    .unindent(`}`);
const code: string = writer.toCode();
```

## With language-specific options configured
```ts
import { CodeWriter, CodeWriterOptions } from 'codewriter';

const options: CodeWriterOptions = {
    // Configure for C# language conventions
};
const writer = new CodeWriter(options);
writer
    .multiLineComment(
        `Automatically generated using CodeWriter`,
        `Copyright (c) 2017`,
        `All rights reserved`
    )
    .blank()
    .line(`using System;`)
    .blank()
    .startBlock(`namespace ConsoleProgram`)
        .startBlock(`internal static class Program`)
            .startBlock(`private static void Main(string[] args)`)
                .comment(`// Your code goes here`)
            .endBlock()
        .endBlock()
    .endBlock();
const code: string = writer.toCode();
```
