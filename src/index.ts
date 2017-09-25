import * as os from 'os';

export class CodeWriter {
    private code: string[];

    private currentLine: string = '';
    private currentIndent: number = 0;

    private options: CodeWriterOptions;
    private indentSize: number;

    /**
     * Creates an instance of the CodeWriter class.
     * @param {CodeWriterOptions} options - Options used to configure the CodeWriter instance.
     * If not specified, default options are used.
     */
    constructor(options?: CodeWriterOptions) {
        this.options = options || {};
        const initialCode: InitialCode = this.options.initialCode;
        if (initialCode) {
            if (typeof initialCode === 'string') {
                this.code = [initialCode];
            } else if (initialCode instanceof Array) {
                this.code = initialCode;
            } else if (initialCode instanceof CodeWriter) {
                this.code = initialCode.code;
            }
        } else {
            this.code = [];
        }
        this.indentSize = this.options.indentSize || 4;
    }

    /**
     * Indents the current indent level.
     * @param {string} code - If specified, code is added after indenting
     */
    public indent(code?: string): this {
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
    public unindent(code?: string): this {
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
    public line(...code: string[]): this {
        for (let i = 0; i < (code || []).length; i++) {
            this.code.push(' '.repeat(this.currentIndent) + code[i]);
        }
        return this;
    }

    public lineIf(condition: boolean, ...code: string[]): this {
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
    public inline(code: string, condition: boolean): this {
        if (condition == undefined || (condition != undefined && condition)) {
            this.currentLine = (this.currentLine || '') + code;
        }
        return this;
    }

    /**
     * Indicates the completion of one or more inline() calls and outputs the current line.
     */
    public done(): this {
        if (this.currentLine) {
            this.code.push(' '.repeat(this.currentIndent) + this.currentLine);
            this.currentLine = '';
        }
        return this;
    }

    public blank(condition?: boolean): this {
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
    public repeat<T>(arr: T[], fn: (cw: this, item: T, index: number, array: T[]) => void): this {
        for (let i = 0; i < (arr || []).length; i++) {
            fn(this, arr[i], i, arr);
        }
        return this;
    }

    public iterate(obj: { [k: string]: Object }, fn: (cw: this, item: Object, k: string) => void): this {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                fn(this, obj[key], key);
            }
        }
        return this;
    }

    public func(builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this {
        builderFn(this, ...args);
        return this;
    }

    public funcIf(condition: boolean, builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this {
        if (condition) {
            builderFn(this, ...args);
        }
        return this;
    }

    public comment(...comments: string[]): this {
        if (!this.options.singleLineComment) {
            throw new Error(`Formatter for a single line comment needs to be defined in the CodeWriter's constructor.`);
        }
        const formattedComments = (comments || [])
            .map(c => this.options.singleLineComment ? this.options.singleLineComment(c) : '');
        this.line(...formattedComments);
        return this;
    }

    public multiLineComment(...comments: string[]): this {
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
    public toCode(): string {
        return this.code.join(os.EOL);
    }
}

export interface CodeWriterOptions {
    initialCode?: InitialCode;
    indentSize?: number;
    singleLineComment?: (comment: string) => string;
    multiLineComment?: (comments: string[]) => string[];
}

export type InitialCode = string | string[] | CodeWriter | undefined;
