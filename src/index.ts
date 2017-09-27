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
     * Writes an opening block. The logic to write the block is language-specific and should be
     * configured in the options.startBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     */
    public startBlock(code?: string): this {
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
    public endBlock(code?: string): this {
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
    public line(...code: string[]): this {
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
    public lineIf(condition: boolean, ...code: string[]): this {
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
    public inline(code: string, condition?: boolean): this {
        if (condition == undefined || (condition != undefined && condition)) {
            this.currentLine = (this.currentLine || '') + code;
        }
        return this;
    }

    /**
     * Indicates the completion of one or more inline() calls and writes the current line.
     */
    public done(): this {
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
    public blank(condition?: boolean): this {
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
    public repeat<T>(arr: T[], fn: (cw: this, item: T, index: number, array: T[]) => void): this {
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
    public iterate(obj: { [k: string]: Object }, fn: (cw: this, item: Object, k: string) => void): this {
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
    public func(builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this {
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
    public funcIf(condition: boolean, builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this {
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
    public comment(...comments: string[]): this {
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
    public multiLineComment(...comments: string[]): this {
        if (!this.options.multiLineComment) {
            throw new Error(`Formatter for a multi line comment needs to be defined in the CodeWriter's constructor.`);
        }
        this.options.multiLineComment(this, comments);
        return this;
    }

    /**
     * Returns the currently built code as a string
     */
    public toCode(): string {
        return this.code.join(os.EOL);
    }
}

/**
 * Options to initialize and configure the behavior of a CodeWriter instance.
 */
export interface CodeWriterOptions {
    /**
     * Optional code to initialize the CodeWriter with.
     */
    initialCode?: InitialCode;

    /**
     * The indentation size in spaces. Defaults to 4 if not specified.
     */
    indentSize?: number;

    /**
     * Function that can format a given string as a language-specific single-line comment.
     */
    singleLineComment?: SingleLineCommentFn;

    /**
     * Function that can format a given string array as a language-specific multi-line comment.
     */
    multiLineComment?: MultiLineCommentFn;

    /**
     * Function that can write out a start block.
     */
    startBlock?: StartBlockFn;

    /**
     * Function that can write out an end block.
     */
    endBlock?: EndBlockFn;
}

export type InitialCode = string | string[] | CodeWriter | undefined;
export type SingleLineCommentFn = (cw: CodeWriter, comment: string) => void;
export type MultiLineCommentFn = (cw: CodeWriter, comments: string[]) => void;
export type StartBlockFn = (cw: CodeWriter, code?: string) => void;
export type EndBlockFn = (cw: CodeWriter, code?: string) => void;

export class OptionsLibrary {
    public static cLanguageFamily(prefs?: {
        braceLayout?: 'endOfLine' | 'endOfLineNoSpace' | 'nextLine';
    }): CodeWriterOptions {
        prefs = prefs || {};
        const options: CodeWriterOptions = {
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
                } else {
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

    public static get csharp(): CodeWriterOptions {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'nextLine'
        });
    }

    public static get java(): CodeWriterOptions {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine'
        });
    }

    public static get javascript(): CodeWriterOptions {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine'
        });
    }

    public static get typescript(): CodeWriterOptions {
        return OptionsLibrary.cLanguageFamily({
            braceLayout: 'endOfLine'
        });
    }
}
