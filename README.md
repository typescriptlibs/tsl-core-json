TypeScript Library for JSON
===========================

This is a TypeScript-optimized library to handle JSON.



Installation
------------

```sh
npm install tsl-core-json
```



API
---

### JSON.extract

Extracts a path in a JSON object and returns the found portion.

#### Parameters:

- **json**: `JSON` - JSON object to extract from.

- **path**:

  - `string` - Path in the JSON object to extract.

  - `Array<(string|RegExp)>` - Path selectors for multiple JSON objects to
    extract.

#### Returns:

- `JSON.Type` - JSON object or primitive, if path was found.

- `undefined` - Void, if path was not found.



Links
-----

* [github.com/typescriptlibs/tsl-core-json](https://github.com/typescriptlibs/tsl-core-json/releases)

* [npmjs.com/package/tsl-core-json](https://www.npmjs.com/package/tsl-core-json)

* [typescriptlibs.org](https://typescriptlibs.org/)
