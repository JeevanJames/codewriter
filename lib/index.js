"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
class CodeWriter {
    /**
     * Creates an instance of the CodeWriter class.
     * @param {CodeWriterOptions} options - Options used to configure the CodeWriter instance.
     * If not specified, default options are used.
     */
    constructor(options) {
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
    }
    /**
     * Indents the current indent level.
     * @param {string} code - If specified, code is added after indenting
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
     */
    line(...code) {
        for (let i = 0; i < (code || []).length; i++) {
            this.code.push(' '.repeat(this.currentIndent) + code[i]);
        }
        return this;
    }
    /**
     * Writes one or more lines of indented code, only if the specified condition is satisfied.
     * @param {boolean} condition The condition to satisfy
     * @param {string[]} code One or more lines of code to write
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
     */
    inline(code, condition) {
        if (condition == undefined || (condition != undefined && condition)) {
            this.currentLine = (this.currentLine || '') + code;
        }
        return this;
    }
    /**
     * Indicates the completion of one or more inline() calls and writes the current line.
     */
    done() {
        if (this.currentLine) {
            this.code.push(' '.repeat(this.currentIndent) + this.currentLine);
            this.currentLine = '';
        }
        return this;
    }
    /**
     * Writes a blank line.
     * @param condition Optional condition to write the blank line
     */
    blank(condition) {
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
     */
    iterate(obj, fn) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(this, obj[key], key);
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
     * @param comments
     */
    comment(...comments) {
        if (!this.options.singleLineComment) {
            throw new Error(`Formatter for a single line comment needs to be defined in the CodeWriter's constructor.`);
        }
        const commentFn = this.options.singleLineComment;
        (comments || []).forEach(comment => commentFn(this, comment));
        return this;
    }
    /**
     * Constructs a multi line comment string and generates code for it.
     * The options.multiLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * @param comments
     */
    multiLineComment(...comments) {
        if (!this.options.multiLineComment) {
            throw new Error(`Formatter for a multi line comment needs to be defined in the CodeWriter's constructor.`);
        }
        this.options.multiLineComment(this, comments);
        return this;
    }
    /**
     * Returns the currently built code as a string
     */
    toCode() {
        return this.code.join(os.EOL);
    }
}
exports.CodeWriter = CodeWriter;
class OptionsLibrary {
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
    static get csharp() {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'nextLine',
        });
    }
    static get java() {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
    }
    static get javascript() {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
    }
    static get typescript() {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine',
        });
    }
}
exports.OptionsLibrary = OptionsLibrary;
