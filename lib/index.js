"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
/**
 * Provides methods to build code blocks.
 */
class CodeWriter {
    /**
     * Creates an instance of the CodeWriter class.
     * @param {CodeWriterOptions} options - Options used to configure the CodeWriter instance.
     * If not specified, default options are used.
     */
    constructor(options) {
        /* Tracking variables */
        this.currentLine = '';
        this.currentIndent = 0;
        this.options = options || {};
        const initialCode = this.options.initialCode;
        if (initialCode) {
            if (typeof initialCode === 'string') {
                this.code = [initialCode];
            }
            else if (initialCode instanceof Array) {
                this.code = initialCode;
            }
            else if (initialCode instanceof CodeWriter) {
                this.code = initialCode.code;
            }
        }
        else {
            this.code = [];
        }
        this.indentSize = this.options.indentSize || 4;
        this.indentType = this.options.indentType || 'spaces';
    }
    /**
     * Indents the current indent level.
     * @param {string} code If specified, code is added after indenting
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    indent(code) {
        this.currentIndent += this.indentSize;
        if (code) {
            this.line(code);
        }
        return this;
    }
    /**
     * Unindents the current indent level.
     * @param {string} code - If specified, code is added after unindenting.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    unindent(code) {
        this.currentIndent -= this.indentSize;
        if (this.currentIndent < 0) {
            this.currentIndent = 0;
            // console.warn(`CodeBuilder indent has become negative.`);
        }
        if (code) {
            this.line(code);
        }
        return this;
    }
    /**
     * Writes an opening block. The logic to write the block is language-specific and should be
     * configured in the options.startBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    startBlock(code) {
        if (!this.options.startBlock) {
            throw new Error(`Formatter for a start block needs to be defined in the CodeWriter's constructor.`);
        }
        this.options.startBlock(this, code);
        return this;
    }
    /**
     * Writes a closing block. The logic to write the block is language-specific and should be
     * configured in the options.endBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    endBlock(code) {
        if (!this.options.endBlock) {
            throw new Error(`Formatter for an end block needs to be defined in the CodeWriter's constructor.`);
        }
        this.options.endBlock(this, code);
        return this;
    }
    /**
     * Writes one or more lines of indented code.
     * @param {string[]} code - One or more lines of code to write.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    line(...code) {
        // If we're in a conditional block and the condition evaluates to false, don't do anything.
        if (this.condition != undefined && !this.condition) {
            return this;
        }
        for (let i = 0; i < (code || []).length; i++) {
            const indent = this.indentType === 'spaces' ? ' '.repeat(this.currentIndent)
                : '\t'.repeat(this.currentIndent / this.indentSize);
            this.code.push(indent + code[i]);
        }
        return this;
    }
    /**
     * Writes one or more lines of indented code, only if the specified condition is satisfied.
     * @param {boolean} condition The condition to satisfy
     * @param {string[]} code One or more lines of code to write
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    lineIf(condition, ...code) {
        if (condition) {
            this.line(...code);
        }
        return this;
    }
    /**
     * Adds code to the current line, optionally based on a condition.
     * Calls to inline can be chained until done() is called at which point the line is written.
     * @param {string} code The code to add to the current line
     * @param {boolean} condition The condition upon which the code will be added
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    inline(code, condition) {
        if (condition == undefined || (condition != undefined && condition)) {
            this.currentLine = (this.currentLine || '') + code;
        }
        return this;
    }
    /**
     * Indicates the completion of one or more inline() calls and writes the current line.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    done() {
        if (this.condition != undefined && !this.condition) {
            this.currentLine = '';
            return this;
        }
        if (this.currentLine) {
            this.code.push(' '.repeat(this.currentIndent) + this.currentLine);
            this.currentLine = '';
        }
        return this;
    }
    /**
     * Writes a blank line.
     * @param condition Optional condition to write the blank line
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    blank(condition) {
        if (this.condition != undefined && !this.condition) {
            return this;
        }
        if (condition === undefined || (condition !== undefined && condition)) {
            this.code.push('');
        }
        return this;
    }
    /**
     * Iterates over an array and executes the given function that builds code based on each item.
     * @param {Array} arr The array to iterate over.
     * @param {Function} fn The function to call for each item. The parameters are the CodeWriter
     * instance, the item and the index of the item in the array.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    repeat(arr, fn) {
        for (let i = 0; i < (arr || []).length; i++) {
            fn(this, arr[i], i, arr);
        }
        return this;
    }
    /**
     * Iterates over the properties of an object and executes the given function that builds code
     * based on each property.
     * @param {Object} obj The object to iterate over
     * @param {Function} fn The function to call for each item. The parameters are the CodeWriter
     * instance, the item and the index of the item in the array.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    iterate(obj, fn) {
        let index = 0;
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(this, obj[key], key, index++);
            }
        }
        return this;
    }
    /**
     * Calls a function passing in the CodeWriter instance and additional arguments.
     * Allows you to generate code based on complex logic, which is not possible using the fluent API.
     * @param { Function } builderFn The function to call. The parameters are the CodeWriter
     * instance and the additional arguments.
     * @param { Object[] } args The additional arguments to pass to the function.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    func(builderFn, ...args) {
        if (!builderFn) {
            throw new Error(`Function not specified in call to CodeWriter.func().`);
        }
        builderFn(this, ...args);
        return this;
    }
    /**
     * Calls a function passing in the CodeWriter instance and additional arguments. The function is
     * called only if the specified boolean condition is met.
     * Allows you to generate code based on complex logic, which is not possible using the fluent API.
     * @param { Function } builderFn The function to call. The parameters are the CodeWriter
     * instance and the additional arguments.
     * @param { Object[] } args The additional arguments to pass to the function.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    funcIf(condition, builderFn, ...args) {
        if (!builderFn) {
            throw new Error(`Function not specified in call to CodeWriter.func().`);
        }
        if (condition) {
            builderFn(this, ...args);
        }
        return this;
    }
    /**
     * Constructs a single line comment string and generates code for it.
     * The options.singleLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * @param {string[]} comments Comment strings to generate
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    comment(...comments) {
        if (!this.options.singleLineComment) {
            throw new Error(`Formatter for a single line comment needs to be defined in the CodeWriter's constructor.`);
        }
        (comments || []).forEach(comment => this.options.singleLineComment(this, comment));
        return this;
    }
    /**
     * Constructs a multi line comment string and generates code for it.
     * The options.multiLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * If the option property is not assigned, the method attempts to use the
     * options.singleLineComment property to generate multiple single line comments.
     * @param {string[]} comments Comment strings to generate
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    multiLineComment(...comments) {
        if (!this.options.multiLineComment && !this.options.singleLineComment) {
            throw new Error(`Formatter for a multi line comment needs to be defined in the CodeWriter's constructor.`);
        }
        if (this.options.multiLineComment) {
            this.options.multiLineComment(this, comments);
        }
        if (this.options.singleLineComment) {
            (comments || []).forEach(comment => this.options.singleLineComment(this, comment));
        }
        return this;
    }
    docComment(...comments) {
        if (!this.options.docComment) {
            throw new Error(`Formatter for a doc comment needs to be defined in the CodeWriter's constructor.`);
        }
        this.options.docComment(this, comments);
        return this;
    }
    if(condition) {
        if (this.condition != undefined) {
            throw new Error(`If condition already exists. Nested conditions not supported.`);
        }
        this.condition = condition;
        return this;
    }
    endIf() {
        this.condition = undefined;
        return this;
    }
    /**
     * Returns the currently built code as a string
     * @returns {string} Currently built code
     */
    toCode() {
        return this.code.join(os.EOL);
    }
}
exports.CodeWriter = CodeWriter;
/**
 * Provides pre-defined option sets for common languages and language families.
 */
class OptionsLibrary {
    /**
     * Returns options that apply to the C family of languages, including C/C++, C#, Java, etc.
     * @param {Object} prefs Fine-grained preferences for generating the options
     */
    static cLanguageFamily(prefs) {
        prefs = prefs || {};
        const options = {
            singleLineComment: (writer, comment) => {
                writer.line(`// ${comment}`);
            },
            multiLineComment: (writer, comments) => {
                writer.line('/*')
                    .repeat(comments || [], (cw, comment) => {
                    cw.line(`   ${comment}`);
                })
                    .line(' */');
            },
            startBlock: (writer, code) => {
                const braceLayout = (prefs || {}).braceLayout || 'endOfLine';
                if (braceLayout === 'nextLine') {
                    writer.lineIf(!!code, code || '')
                        .line('{');
                }
                else {
                    writer
                        .inline(`${code}`, !!code)
                        .inline(` `, !code || braceLayout === 'endOfLine')
                        .inline('{')
                        .done();
                }
                writer.indent();
            },
            endBlock: (writer, code) => {
                writer.unindent(code || '}');
            },
        };
        return options;
    }
    /**
     * Returns options that apply to the C language
     */
    static get c() {
        const option = OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
        option.docComment = OptionsLibrary.getCppCommentFn();
        return option;
    }
    /**
     * Returns options that apply to the C++ language
     */
    static get cpp() {
        const option = OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
        option.docComment = OptionsLibrary.getCppCommentFn();
        return option;
    }
    /**
     * Returns options that apply to the C# language
     */
    static get csharp() {
        const options = OptionsLibrary.cLanguageFamily({
            braceLayout: 'nextLine',
        });
        options.docComment = (writer, comments) => {
            writer
                .line(`/// <summary>`)
                .repeat(comments || [], (cw, comment) => {
                cw.line(`/// ${comment}`);
            })
                .line(`/// </summary>`);
        };
        return options;
    }
    /**
     * Returns options that apply to the Java language
     */
    static get java() {
        const option = OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
        option.docComment = OptionsLibrary.getJsDocCommentFn();
        return option;
    }
    /**
     * Returns options that apply to the JavaScript language
     */
    static get javascript() {
        const option = OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
        option.docComment = OptionsLibrary.getJsDocCommentFn();
        return option;
    }
    /**
     * Returns options that apply to the Python language
     */
    static get python() {
        const options = {
            singleLineComment: (writer, comment) => {
                writer.line(`# ${comment}`);
            },
            docComment: (writer, comments) => {
                writer.repeat(comments || [], (code, comment, i, arr) => {
                    code.inline(`""" `, i === 0)
                        .inline(comment)
                        .inline(` """`, arr.length === 1)
                        .done();
                })
                    .lineIf(!!comments && comments.length > 1, `"""`);
            },
            startBlock: (writer, code) => {
                if (code) {
                    writer.line(code);
                }
                writer.indent();
            },
            endBlock: (writer, code) => {
                writer.unindent();
                if (code) {
                    writer.line(code);
                }
            },
        };
        return options;
    }
    /**
     * Returns options that apply to the Typescript language
     */
    static get typescript() {
        const option = OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
        option.docComment = OptionsLibrary.getJsDocCommentFn();
        return option;
    }
    static getCppCommentFn() {
        return (writer, comments) => {
            writer
                .line(`/**`)
                .repeat(comments || [], (cw, comment) => {
                cw.line(`    ${comment}`);
            })
                .line(`*/`);
        };
    }
    static getJsDocCommentFn() {
        return (writer, comments) => {
            writer
                .line(`/**`)
                .repeat(comments || [], (cw, comment) => {
                cw.line(` * ${comment}`);
            })
                .line(` */`);
        };
    }
}
exports.OptionsLibrary = OptionsLibrary;
