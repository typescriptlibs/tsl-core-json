/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript Library for JSON

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
/* *
 *
 *  Namespace
 *
 * */
export var JSON;
(function (JSON) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    function convertGlobToRegExp(glob) {
        const pattern = glob
            .replace(/(?:(^|[^//])\*)+/g, '$1.*')
            .replace(/(?:(^|[^//])\?)+/g, '$1.?')
            .replace(/(?:(^|[^//])\[!)+/g, '$1[^');
        return new RegExp(glob, 'gu');
    }
    JSON.convertGlobToRegExp = convertGlobToRegExp;
    function extract(json, pathOrPatterns) {
        if (pathOrPatterns instanceof Array) {
            return extractWithPatterns(json, pathOrPatterns);
        }
        return extractWithPath(json, pathOrPatterns);
    }
    JSON.extract = extract;
    function extractWithPath(json, path) {
        const steps = path.split('.');
        let nextJump = NaN;
        let step = json;
        for (let nextStep of steps) {
            if (typeof step !== 'object' ||
                step === null) {
                return;
            }
            if (step instanceof Array) {
                nextJump = parseInt(nextStep);
                if (isNaN(nextJump)) {
                    return;
                }
                step = step[nextJump];
            }
            else {
                step = step[nextStep];
            }
        }
        return step;
    }
    function extractWithPatterns(json, patterns) {
        const pattern = patterns[0];
        const matches = [];
        for (const key in json) {
            if ((typeof pattern === 'string' &&
                pattern === key) ||
                (typeof pattern === 'object' &&
                    pattern.test(`${key}`))) {
                let value = json[key];
                if (patterns.length > 1) {
                    if (value === null ||
                        typeof value !== 'object') {
                        continue;
                    }
                    value = extractWithPatterns(value, patterns.slice(1));
                }
                if (typeof value !== 'undefined') {
                    matches.push(value);
                }
            }
        }
        return (matches.length ? matches : undefined);
    }
    function parse(text, reviver) {
        return globalThis.JSON.parse(text, reviver);
    }
    JSON.parse = parse;
    function stringify(json, replacer, space) {
        return globalThis.JSON.stringify(json, replacer, space);
    }
    JSON.stringify = stringify;
})(JSON = JSON || (JSON = {}));
/* *
 *
 *  Default Export
 *
 * */
export default JSON;
//# sourceMappingURL=JSON.js.map