# Sample options
The following options configuration can be used when generating JavaScript code:

```js
// Outputs this type of
// comment when the CodeWriter.comment
// method is called.
options.singleLineComment = (writer, comment) => {
    writer.line(`// ${comment}`);
};

/*
   Outputs this type of
   comment when the CodeWriter.multiLineComment
   method is called.
*/
options.multiLineComment = (writer, comments) => {
    writer.line('/*')
        .repeat(comments || [], (cw, comment) => {
            cw.line(`   ${comment}`);
        })
        .line('*/');
};

/**
 * Outputs thie type of
 * comment when the CodeWriter.docComment
 * method is called.
 */
options.docComment = (writer, comments) => {
    writer.line('/**')
        .repeat(comments || [], (cw, comment) => {
            cw.line(` * ${comment}`);
        })
        .line(' */');
};

options.startBlock = (writer, code) => {
    writer.inline(`${code} `, !!code).inline('{').done()
        .indent();
};

options.endBlock = (writer, code) => {
    writer.unindent(code || '}');
};
```
