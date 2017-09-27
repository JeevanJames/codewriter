import { CodeWriterOptions } from './code-writer-options';
export declare class CodeWriter {
    private code;
    private currentLine;
    private currentIndent;
    private options;
    private indentSize;
    /**
     * Creates an instance of the CodeWriter class.
     * @param {CodeWriterOptions} options - Options used to configure the CodeWriter instance.
     * If not specified, default options are used.
     */
    constructor(options?: CodeWriterOptions);
    /**
     * Indents the current indent level.
     * @param {string} code - If specified, code is added after indenting
     */
    indent(code?: string): this;
    /**
     * Unindents the current indent level.
     * @param {string} code - If specified, code is added after unindenting.
     */
    unindent(code?: string): this;
    /**
     * Writes an opening block. The logic to write the block is language-specific and should be
     * configured in the options.startBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     */
    startBlock(code?: string): this;
    /**
     * Writes a closing block. The logic to write the block is language-specific and should be
     * configured in the options.endBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     */
    endBlock(code?: string): this;
    /**
     * Writes one or more lines of indented code.
     * @param {string[]} code - One or more lines of code to write.
     */
    line(...code: string[]): this;
    /**
     * Writes one or more lines of indented code, only if the specified condition is satisfied.
     * @param {boolean} condition The condition to satisfy
     * @param {string[]} code One or more lines of code to write
     */
    lineIf(condition: boolean, ...code: string[]): this;
    /**
     * Adds code to the current line, optionally based on a condition.
     * Calls to inline can be chained until done() is called at which point the line is written.
     * @param {string} code The code to add to the current line
     * @param {boolean} condition The condition upon which the code will be added
     */
    inline(code: string, condition: boolean): this;
    /**
     * Indicates the completion of one or more inline() calls and writes the current line.
     */
    done(): this;
    /**
     * Writes a blank line.
     * @param condition Optional condition to write the blank line
     */
    blank(condition?: boolean): this;
    /**
     * Iterates over an array and executes the given function that builds code based on each item.
     * @param {Array} arr The array to iterate over.
     * @param {Function} fn The function to call for each item. The parameters are the CodeWriter
     * instance, the item and the index of the item in the array.
     */
    repeat<T>(arr: T[], fn: (cw: this, item: T, index: number, array: T[]) => void): this;
    /**
     * Iterates over the properties of an object and executes the given function that builds code
     * based on each property.
     * @param {Object} obj The object to iterate over
     * @param {Function} fn The function to call for each item. The parameters are the CodeWriter
     * instance, the item and the index of the item in the array.
     */
    iterate(obj: {
        [k: string]: Object;
    }, fn: (cw: this, item: Object, k: string) => void): this;
    /**
     * Calls a function passing in the CodeWriter instance and additional arguments.
     * Allows you to generate code based on complex logic, which is not possible using the fluent API.
     * @param { Function } builderFn The function to call. The parameters are the CodeWriter
     * instance and the additional arguments.
     * @param { Object[] } args The additional arguments to pass to the function.
     */
    func(builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this;
    /**
     * Calls a function passing in the CodeWriter instance and additional arguments. The function is
     * called only if the specified boolean condition is met.
     * Allows you to generate code based on complex logic, which is not possible using the fluent API.
     * @param { Function } builderFn The function to call. The parameters are the CodeWriter
     * instance and the additional arguments.
     * @param { Object[] } args The additional arguments to pass to the function.
     */
    funcIf(condition: boolean, builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this;
    /**
     * Constructs a single line comment string and generates code for it.
     * The options.singleLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * @param comments
     */
    comment(...comments: string[]): this;
    /**
     * Constructs a multi line comment string and generates code for it.
     * The options.multiLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * @param comments
     */
    multiLineComment(...comments: string[]): this;
    /**
     * Returns the currently built code as a string
     */
    toCode(): string;
}
