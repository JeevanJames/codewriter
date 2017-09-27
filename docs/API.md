<a name="CodeWriter"></a>

## CodeWriter
**Kind**: global class  

* [CodeWriter](#CodeWriter)
    * [new CodeWriter(options)](#new_CodeWriter_new)
    * [.indent(code)](#CodeWriter+indent)
    * [.unindent(code)](#CodeWriter+unindent)
    * [.startBlock(code)](#CodeWriter+startBlock)
    * [.endBlock(code)](#CodeWriter+endBlock)
    * [.line(...code)](#CodeWriter+line)
    * [.lineIf(condition, ...code)](#CodeWriter+lineIf)
    * [.inline(code, condition)](#CodeWriter+inline)
    * [.done()](#CodeWriter+done)
    * [.blank(condition)](#CodeWriter+blank)
    * [.repeat(arr, fn)](#CodeWriter+repeat)
    * [.iterate(obj, fn)](#CodeWriter+iterate)
    * [.func(builderFn, ...args)](#CodeWriter+func)
    * [.funcIf(builderFn, ...args)](#CodeWriter+funcIf)
    * [.comment(...comments)](#CodeWriter+comment)
    * [.multiLineComment(...comments)](#CodeWriter+multiLineComment)
    * [.toCode()](#CodeWriter+toCode)

<a name="new_CodeWriter_new"></a>

### new CodeWriter(options)
Creates an instance of the CodeWriter class.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>CodeWriterOptions</code> | Options used to configure the CodeWriter instance. If not specified, default options are used. |

<a name="CodeWriter+indent"></a>

### codeWriter.indent(code)
Indents the current indent level.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | If specified, code is added after indenting |

<a name="CodeWriter+unindent"></a>

### codeWriter.unindent(code)
Unindents the current indent level.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | If specified, code is added after unindenting. |

<a name="CodeWriter+startBlock"></a>

### codeWriter.startBlock(code)
Writes an opening block. The logic to write the block is language-specific and should beconfigured in the options.startBlock property.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Optional code that can be part of the block. This may be used for certain languages and ignored for others. |

<a name="CodeWriter+endBlock"></a>

### codeWriter.endBlock(code)
Writes a closing block. The logic to write the block is language-specific and should beconfigured in the options.endBlock property.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Optional code that can be part of the block. This may be used for certain languages and ignored for others. |

<a name="CodeWriter+line"></a>

### codeWriter.line(...code)
Writes one or more lines of indented code.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| ...code | <code>Array.&lt;string&gt;</code> | One or more lines of code to write. |

<a name="CodeWriter+lineIf"></a>

### codeWriter.lineIf(condition, ...code)
Writes one or more lines of indented code, only if the specified condition is satisfied.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>boolean</code> | The condition to satisfy |
| ...code | <code>Array.&lt;string&gt;</code> | One or more lines of code to write |

<a name="CodeWriter+inline"></a>

### codeWriter.inline(code, condition)
Adds code to the current line, optionally based on a condition.Calls to inline can be chained until done() is called at which point the line is written.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | The code to add to the current line |
| condition | <code>boolean</code> | The condition upon which the code will be added |

<a name="CodeWriter+done"></a>

### codeWriter.done()
Indicates the completion of one or more inline() calls and writes the current line.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
<a name="CodeWriter+blank"></a>

### codeWriter.blank(condition)
Writes a blank line.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Description |
| --- | --- |
| condition | Optional condition to write the blank line |

<a name="CodeWriter+repeat"></a>

### codeWriter.repeat(arr, fn)
Iterates over an array and executes the given function that builds code based on each item.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to iterate over. |
| fn | <code>function</code> | The function to call for each item. The parameters are the CodeWriter instance, the item and the index of the item in the array. |

<a name="CodeWriter+iterate"></a>

### codeWriter.iterate(obj, fn)
Iterates over the properties of an object and executes the given function that builds codebased on each property.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to iterate over |
| fn | <code>function</code> | The function to call for each item. The parameters are the CodeWriter instance, the item and the index of the item in the array. |

<a name="CodeWriter+func"></a>

### codeWriter.func(builderFn, ...args)
Calls a function passing in the CodeWriter instance and additional arguments.Allows you to generate code based on complex logic, which is not possible using the fluent API.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| builderFn | <code>function</code> | The function to call. The parameters are the CodeWriter instance and the additional arguments. |
| ...args | <code>Array.&lt;Object&gt;</code> | The additional arguments to pass to the function. |

<a name="CodeWriter+funcIf"></a>

### codeWriter.funcIf(builderFn, ...args)
Calls a function passing in the CodeWriter instance and additional arguments. The function iscalled only if the specified boolean condition is met.Allows you to generate code based on complex logic, which is not possible using the fluent API.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param | Type | Description |
| --- | --- | --- |
| builderFn | <code>function</code> | The function to call. The parameters are the CodeWriter instance and the additional arguments. |
| ...args | <code>Array.&lt;Object&gt;</code> | The additional arguments to pass to the function. |

<a name="CodeWriter+comment"></a>

### codeWriter.comment(...comments)
Constructs a single line comment string and generates code for it.The options.singleLineComment property must be assigned for the CodeWriter to know how toconstruct the comment string.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param |
| --- |
| ...comments | 

<a name="CodeWriter+multiLineComment"></a>

### codeWriter.multiLineComment(...comments)
Constructs a multi line comment string and generates code for it.The options.multiLineComment property must be assigned for the CodeWriter to know how toconstruct the comment string.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  

| Param |
| --- |
| ...comments | 

<a name="CodeWriter+toCode"></a>

### codeWriter.toCode()
Returns the currently built code as a string

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
