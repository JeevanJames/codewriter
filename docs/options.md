# CodeWriter options
All options are optional and have defaults.

| Option | Type | Default | Description |
|---------|---------|---------|---------|
|**indentSize**|`number`|4|Size of the code indentation, in number of spaces|
|**initialCode**|Multiple types|-|Code to initialize the CodeWriter with. Could be a `string`, `string[]` or another `CodeWriter` instance.|
|**singleLineComment**|`function`|-|Function that accepts a `CodeWriter` instance and a comment string and writes out a single-line comment in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `comment` method.|
|**multiLineComment**|`function`|-|Function that accepts a `CodeWriter` instance and a string array containing multiple comments, and writes out  a multi-line comment in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `multiLineComment` method.|
|**startBlock**|`function`|-|Function that accepts a `CodeWriter` instance and an optional code, and writes out a opening block in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `startBlock` method.|
|**endBlock**|`function`|-|Function that accepts a `CodeWriter` instance and an optional code, and writes out a closing block in the intended language. If not specified, `CodeWriter` will throw an exception if you try to call the `endBlock` method.|
