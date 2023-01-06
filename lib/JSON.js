/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript Library for JSON

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
/* *
 *
 *  Constants
 *
 * */
const SQL_PATH_SEPARATORS_REGEXP = /\.\[?|\]/gu;
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
    function extract(json, path) {
        const pathWay = path.split(SQL_PATH_SEPARATORS_REGEXP);
        let nextJump;
        let step = json;
        for (let nextStep of pathWay) {
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
    JSON.extract = extract;
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