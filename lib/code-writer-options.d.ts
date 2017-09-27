import { CodeWriter } from './index';
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
export declare type InitialCode = string | string[] | CodeWriter | undefined;
export declare type SingleLineCommentFn = (cw: CodeWriter, comment: string) => void;
export declare type MultiLineCommentFn = (cw: CodeWriter, comments: string[]) => void;
export declare type StartBlockFn = (cw: CodeWriter, code?: string) => void;
export declare type EndBlockFn = (cw: CodeWriter, code?: string) => void;
