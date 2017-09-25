"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
class CodeWriter {
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
     * @param {Function} fn The function to call for each item. The parameters are the CodeBuilder
     * instance, the item and the index of the item in the array.
     */
    repeat(arr, fn) {
        for (let i = 0; i < (arr || []).length; i++) {
            fn(this, arr[i], i, arr);
        }
        return this;
    }
    iterate(obj, fn) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(this, obj[key], key);
            }
        }
        return this;
    }
    func(builderFn, ...args) {
        builderFn(this, ...args);
        return this;
    }
    funcIf(condition, builderFn, ...args) {
        if (condition) {
            builderFn(this, ...args);
        }
        return this;
    }
    comment(...comments) {
        if (!!this.options.singleLineComment) {
            const formattedComments = (comments || [])
                .map(c => this.options.singleLineComment ? this.options.singleLineComment(c) : '');
            this.line(...formattedComments);
        }
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
