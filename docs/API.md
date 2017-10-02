## Classes

<dl>
<dt><a href="#CodeWriter">CodeWriter</a></dt>
<dd><p>Provides methods to build code blocks.</p>
</dd>
<dt><a href="#OptionsLibrary">OptionsLibrary</a></dt>
<dd><p>Provides pre-defined option sets for common languages and language families.</p>
</dd>
</dl>

<a name="CodeWriter"></a>

## CodeWriter
Provides methods to build code blocks.

**Kind**: global class  

* [CodeWriter](#CodeWriter)
    * [new CodeWriter(options)](#new_CodeWriter_new)
    * [.indent(code)](#CodeWriter+indent) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.unindent(code)](#CodeWriter+unindent) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.startBlock(code)](#CodeWriter+startBlock) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.endBlock(code)](#CodeWriter+endBlock) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.line(...code)](#CodeWriter+line) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.lineIf(condition, ...code)](#CodeWriter+lineIf) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.inline(code, condition)](#CodeWriter+inline) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.done()](#CodeWriter+done) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.blank(condition)](#CodeWriter+blank) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.repeat(arr, fn)](#CodeWriter+repeat) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.iterate(obj, fn)](#CodeWriter+iterate) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.func(builderFn, ...args)](#CodeWriter+func) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.funcIf(builderFn, ...args)](#CodeWriter+funcIf) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.comment(...comments)](#CodeWriter+comment) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.multiLineComment(...comments)](#CodeWriter+multiLineComment) ⇒ [<code>CodeWriter</code>](#CodeWriter)
    * [.toCode()](#CodeWriter+toCode) ⇒ <code>string</code>

<a name="new_CodeWriter_new"></a>

### new CodeWriter(options)
Creates an instance of the CodeWriter class.


| Param | Type | Description |
| --- | --- | --- |
| options | <code>CodeWriterOptions</code> | Options used to configure the CodeWriter instance. If not specified, default options are used. |

<a name="CodeWriter+indent"></a>

### codeWriter.indent(code) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Indents the current indent level.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | If specified, code is added after indenting |

<a name="CodeWriter+unindent"></a>

### codeWriter.unindent(code) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Unindents the current indent level.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | If specified, code is added after unindenting. |

<a name="CodeWriter+startBlock"></a>

### codeWriter.startBlock(code) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Writes an opening block. The logic to write the block is language-specific and should beconfigured in the options.startBlock property.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Optional code that can be part of the block. This may be used for certain languages and ignored for others. |

<a name="CodeWriter+endBlock"></a>

### codeWriter.endBlock(code) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Writes a closing block. The logic to write the block is language-specific and should beconfigured in the options.endBlock property.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | Optional code that can be part of the block. This may be used for certain languages and ignored for others. |

<a name="CodeWriter+line"></a>

### codeWriter.line(...code) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Writes one or more lines of indented code.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| ...code | <code>Array.&lt;string&gt;</code> | One or more lines of code to write. |

<a name="CodeWriter+lineIf"></a>

### codeWriter.lineIf(condition, ...code) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Writes one or more lines of indented code, only if the specified condition is satisfied.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| condition | <code>boolean</code> | The condition to satisfy |
| ...code | <code>Array.&lt;string&gt;</code> | One or more lines of code to write |

<a name="CodeWriter+inline"></a>

### codeWriter.inline(code, condition) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Adds code to the current line, optionally based on a condition.Calls to inline can be chained until done() is called at which point the line is written.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>string</code> | The code to add to the current line |
| condition | <code>boolean</code> | The condition upon which the code will be added |

<a name="CodeWriter+done"></a>

### codeWriter.done() ⇒ [<code>CodeWriter</code>](#CodeWriter)
Indicates the completion of one or more inline() calls and writes the current line.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  
<a name="CodeWriter+blank"></a>

### codeWriter.blank(condition) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Writes a blank line.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Description |
| --- | --- |
| condition | Optional condition to write the blank line |

<a name="CodeWriter+repeat"></a>

### codeWriter.repeat(arr, fn) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Iterates over an array and executes the given function that builds code based on each item.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | The array to iterate over. |
| fn | <code>function</code> | The function to call for each item. The parameters are the CodeWriter instance, the item and the index of the item in the array. |

<a name="CodeWriter+iterate"></a>

### codeWriter.iterate(obj, fn) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Iterates over the properties of an object and executes the given function that builds codebased on each property.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object to iterate over |
| fn | <code>function</code> | The function to call for each item. The parameters are the CodeWriter instance, the item and the index of the item in the array. |

<a name="CodeWriter+func"></a>

### codeWriter.func(builderFn, ...args) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Calls a function passing in the CodeWriter instance and additional arguments.Allows you to generate code based on complex logic, which is not possible using the fluent API.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| builderFn | <code>function</code> | The function to call. The parameters are the CodeWriter instance and the additional arguments. |
| ...args | <code>Array.&lt;Object&gt;</code> | The additional arguments to pass to the function. |

<a name="CodeWriter+funcIf"></a>

### codeWriter.funcIf(builderFn, ...args) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Calls a function passing in the CodeWriter instance and additional arguments. The function iscalled only if the specified boolean condition is met.Allows you to generate code based on complex logic, which is not possible using the fluent API.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| builderFn | <code>function</code> | The function to call. The parameters are the CodeWriter instance and the additional arguments. |
| ...args | <code>Array.&lt;Object&gt;</code> | The additional arguments to pass to the function. |

<a name="CodeWriter+comment"></a>

### codeWriter.comment(...comments) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Constructs a single line comment string and generates code for it.The options.singleLineComment property must be assigned for the CodeWriter to know how toconstruct the comment string.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| ...comments | <code>Array.&lt;string&gt;</code> | Comment strings to generate |

<a name="CodeWriter+multiLineComment"></a>

### codeWriter.multiLineComment(...comments) ⇒ [<code>CodeWriter</code>](#CodeWriter)
Constructs a multi line comment string and generates code for it.The options.multiLineComment property must be assigned for the CodeWriter to know how toconstruct the comment string.If the option property is not assigned, the method attempts to use theoptions.singleLineComment property to generate multiple single line comments.

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: [<code>CodeWriter</code>](#CodeWriter) - Instance of the CodeWriter  

| Param | Type | Description |
| --- | --- | --- |
| ...comments | <code>Array.&lt;string&gt;</code> | Comment strings to generate |

<a name="CodeWriter+toCode"></a>

### codeWriter.toCode() ⇒ <code>string</code>
Returns the currently built code as a string

**Kind**: instance method of [<code>CodeWriter</code>](#CodeWriter)  
**Returns**: <code>string</code> - Currently built code  
<a name="OptionsLibrary"></a>

## OptionsLibrary
Provides pre-defined option sets for common languages and language families.

**Kind**: global class  

* [OptionsLibrary](#OptionsLibrary)
    * [.c](#OptionsLibrary.c)
    * [.cpp](#OptionsLibrary.cpp)
    * [.csharp](#OptionsLibrary.csharp)
    * [.java](#OptionsLibrary.java)
    * [.javascript](#OptionsLibrary.javascript)
    * [.python](#OptionsLibrary.python)
    * [.typescript](#OptionsLibrary.typescript)
    * [.cLanguageFamily(prefs)](#OptionsLibrary.cLanguageFamily)

<a name="OptionsLibrary.c"></a>

### OptionsLibrary.c
Returns options that apply to the C language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.cpp"></a>

### OptionsLibrary.cpp
Returns options that apply to the C++ language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.csharp"></a>

### OptionsLibrary.csharp
Returns options that apply to the C# language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.java"></a>

### OptionsLibrary.java
Returns options that apply to the Java language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.javascript"></a>

### OptionsLibrary.javascript
Returns options that apply to the JavaScript language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.python"></a>

### OptionsLibrary.python
Returns options that apply to the Python language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.typescript"></a>

### OptionsLibrary.typescript
Returns options that apply to the Typescript language

**Kind**: static property of [<code>OptionsLibrary</code>](#OptionsLibrary)  
<a name="OptionsLibrary.cLanguageFamily"></a>

### OptionsLibrary.cLanguageFamily(prefs)
Returns options that apply to the C family of languages, including C/C++, C#, Java, etc.

**Kind**: static method of [<code>OptionsLibrary</code>](#OptionsLibrary)  

| Param | Type | Description |
| --- | --- | --- |
| prefs | <code>Object</code> | Fine-grained preferences for generating the options |

