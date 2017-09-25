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
     * Writes one or more lines of indented code.
     * @param {string[]} code - One or more lines of code to write.
     */
    line(...code: string[]): this;
    lineIf(condition: boolean, ...code: string[]): this;
    /**
     * Adds code to the current line, optionally based on a condition.
     * Calls to inline can be chained until done() is called.
     * @param {string} code The code to add to the current line
     * @param {boolean} condition The condition upon which the code will be added
     */
    inline(code: string, condition: boolean): this;
    /**
     * Indicates the completion of one or more inline() calls and outputs the current line.
     */
    done(): this;
    blank(condition?: boolean): this;
    /**
     * Iterates over an array and executes the given function that builds code based on each item.
     * @param {Array} arr The array to iterate over.
     * @param {Function} fn The function to call for each item. The parameters are the CodeBuilder
     * instance, the item and the index of the item in the array.
     */
    repeat<T>(arr: T[], fn: (cw: this, item: T, index: number, array: T[]) => void): this;
    iterate(obj: {
        [k: string]: Object;
    }, fn: (cw: this, item: Object, k: string) => void): this;
    func(builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this;
    funcIf(condition: boolean, builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this;
    comment(...comments: string[]): this;
    multiLineComment(...comments: string[]): this;
    /**
     * Returns the currently built code as a string
     */
    toCode(): string;
}
export interface CodeWriterOptions {
    initialCode?: InitialCode;
    indentSize?: number;
    singleLineComment?: (comment: string) => string;
    multiLineComment?: (comments: string[]) => string[];
}
export declare type InitialCode = string | string[] | CodeWriter | undefined;
