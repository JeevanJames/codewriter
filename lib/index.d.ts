/**
 * Provides methods to build code blocks.
 */
export declare class CodeWriter {
    private code;
    private currentLine;
    private currentIndent;
    private condition;
    private options;
    private indentSize;
    private indentType;
    /**
     * Creates an instance of the CodeWriter class.
     * @param {CodeWriterOptions} options - Options used to configure the CodeWriter instance.
     * If not specified, default options are used.
     */
    constructor(options?: CodeWriterOptions);
    /**
     * Indents the current indent level.
     * @param {string} code If specified, code is added after indenting
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    indent(code?: string): this;
    /**
     * Unindents the current indent level.
     * @param {string} code - If specified, code is added after unindenting.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    unindent(code?: string): this;
    /**
     * Writes an opening block. The logic to write the block is language-specific and should be
     * configured in the options.startBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    startBlock(code?: string): this;
    /**
     * Writes a closing block. The logic to write the block is language-specific and should be
     * configured in the options.endBlock property.
     * @param {string} code Optional code that can be part of the block. This may be used for
     * certain languages and ignored for others.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    endBlock(code?: string): this;
    /**
     * Writes one or more lines of indented code.
     * @param {string[]} code - One or more lines of code to write.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    line(...code: string[]): this;
    /**
     * Writes one or more lines of indented code, only if the specified condition is satisfied.
     * @param {boolean} condition The condition to satisfy
     * @param {string[]} code One or more lines of code to write
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    lineIf(condition: boolean, ...code: string[]): this;
    /**
     * Adds code to the current line, optionally based on a condition.
     * Calls to inline can be chained until done() is called at which point the line is written.
     * @param {string} code The code to add to the current line
     * @param {boolean} condition The condition upon which the code will be added
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    inline(code: string, condition?: boolean): this;
    /**
     * Indicates the completion of one or more inline() calls and writes the current line.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    done(): this;
    /**
     * Writes a blank line.
     * @param condition Optional condition to write the blank line
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    blank(condition?: boolean): this;
    /**
     * Iterates over an array and executes the given function that builds code based on each item.
     * @param {Array} arr The array to iterate over.
     * @param {Function} fn The function to call for each item. The parameters are the CodeWriter
     * instance, the item and the index of the item in the array.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    repeat<T>(arr: T[], fn: (cw: this, item: T, index: number, array: T[]) => void): this;
    /**
     * Iterates over the properties of an object and executes the given function that builds code
     * based on each property.
     * @param {Object} obj The object to iterate over
     * @param {Function} fn The function to call for each item. The parameters are the CodeWriter
     * instance, the item and the index of the item in the array.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    iterate(obj: {
        [k: string]: Object;
    }, fn: (cw: this, item: Object, k: string, i: number) => void): this;
    /**
     * Calls a function passing in the CodeWriter instance and additional arguments.
     * Allows you to generate code based on complex logic, which is not possible using the fluent API.
     * @param { Function } builderFn The function to call. The parameters are the CodeWriter
     * instance and the additional arguments.
     * @param { Object[] } args The additional arguments to pass to the function.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    func(builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this;
    /**
     * Calls a function passing in the CodeWriter instance and additional arguments. The function is
     * called only if the specified boolean condition is met.
     * Allows you to generate code based on complex logic, which is not possible using the fluent API.
     * @param { Function } builderFn The function to call. The parameters are the CodeWriter
     * instance and the additional arguments.
     * @param { Object[] } args The additional arguments to pass to the function.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    funcIf(condition: boolean, builderFn: (cw: this, ...args: Object[]) => void, ...args: Object[]): this;
    /**
     * Constructs a single line comment string and generates code for it.
     * The options.singleLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * @param {string[]} comments Comment strings to generate
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    comment(...comments: string[]): this;
    /**
     * Constructs a multi line comment string and generates code for it.
     * The options.multiLineComment property must be assigned for the CodeWriter to know how to
     * construct the comment string.
     * If the option property is not assigned, the method attempts to use the
     * options.singleLineComment property to generate multiple single line comments.
     * @param {string[]} comments Comment strings to generate
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    multiLineComment(...comments: string[]): this;
    /**
     * Constructs a documentation comment string and generates code for it.
     * The options.docComment property must be assigned for the CodeWriter to know how to construct
     * the comment string.
     * @param {string[]} comments Comment strings to generate
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    docComment(...comments: string[]): this;
    /**
     * Starts a condition block. Any CodeWriter methods called in this block will only be executed
     * if the condition is true.
     * To exit the condition block, call the endIf method.
     * @param condition Condition to evaluate
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    if(condition: boolean): this;
    /**
     * Inverts the condition in a condition block.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    else(): this;
    /**
     * Exits a condition block.
     * @returns {CodeWriter} Instance of the CodeWriter
     */
    endIf(): this;
    /**
     * Returns the currently built code as a string
     * @returns {string} Currently built code
     */
    toCode(): string;
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
    indentType?: 'spaces' | 'tabs';
    /**
     * Function that can format a given string as a language-specific single-line comment.
     */
    singleLineComment?: SingleLineCommentFn;
    /**
     * Function that can format a given string array as a language-specific multi-line comment.
     */
    multiLineComment?: MultiLineCommentFn;
    docComment?: DocCommentFn;
    /**
     * Function that can write out a start block.
     */
    startBlock?: StartBlockFn;
    /**
     * Function that can write out an end block.
     */
    endBlock?: EndBlockFn;
}
export declare type InitialCode = string | string[] | CodeWriter | undefined;
export declare type SingleLineCommentFn = (writer: CodeWriter, comment: string) => void;
export declare type MultiLineCommentFn = (writer: CodeWriter, comments: string[]) => void;
export declare type DocCommentFn = (writer: CodeWriter, comments: string[]) => void;
export declare type StartBlockFn = (writer: CodeWriter, code?: string) => void;
export declare type EndBlockFn = (writer: CodeWriter, code?: string) => void;
/**
 * Provides pre-defined option sets for common languages and language families.
 */
export declare class OptionsLibrary {
    /**
     * Returns options that apply to the C family of languages, including C/C++, C#, Java, etc.
     * @param {Object} prefs Fine-grained preferences for generating the options
     */
    static cLanguageFamily(prefs?: CLanguageFamilyPrefs): CodeWriterOptions;
    /**
     * Returns options that apply to the C language
     */
    static get c(): CodeWriterOptions;
    /**
     * Returns options that apply to the C++ language
     */
    static get cpp(): CodeWriterOptions;
    /**
     * Returns options that apply to the C# language
     */
    static get csharp(): CodeWriterOptions;
    /**
     * Returns options that apply to the Java language
     */
    static get java(): CodeWriterOptions;
    /**
     * Returns options that apply to the JavaScript language
     */
    static get javascript(): CodeWriterOptions;
    /**
     * Returns options that apply to the Python language
     */
    static get python(): CodeWriterOptions;
    /**
     * Returns options that apply to the Typescript language
     */
    static get typescript(): CodeWriterOptions;
    private static getCppCommentFn;
    private static getJsDocCommentFn;
}
export interface CLanguageFamilyPrefs {
    braceLayout?: 'endOfLine' | 'endOfLineNoSpace' | 'nextLine';
}
