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
     * Writes one or more lines of indented code.
     * @param {string[]} code - One or more lines of code to write.
     */
    line(...code) {
        for (let i = 0; i < (code || []).length; i++) {
            this.code.push(' '.repeat(this.currentIndent) + code[i]);
        }
        return this;
    }
    lineIf(condition, ...code) {
        if (condition) {
            this.line(...code);
        }
        return this;
    }
    /**
     * Adds code to the current line, optionally based on a condition.
     * Calls to inline can be chained until done() is called.
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
     * Indicates the completion of one or more inline() calls and outputs the current line.
     */
    done() {
        if (this.currentLine) {
            this.code.push(' '.repeat(this.currentIndent) + this.currentLine);
            this.currentLine = '';
        }
        return this;
    }
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
     * Constructs a comment string and generates code for it.
     * The options.singleLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * @param comments
     */
    comment(...comments) {
        if (!this.options.singleLineComment) {
            throw new Error(`Formatter for a single line comment needs to be defined in the CodeWriter's constructor.`);
        }
        const formattedComments = (comments || [])
            .map(c => this.options.singleLineComment ? this.options.singleLineComment(c) : '');
        this.line(...formattedComments);
        return this;
    }
    multiLineComment(...comments) {
        if (!this.options.multiLineComment) {
            throw new Error(`Formatter for a multi line comment needs to be defined in the CodeWriter's constructor.`);
        }
        const formattedComments = this.options.multiLineComment(comments || []);
        this.line(...formattedComments);
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
