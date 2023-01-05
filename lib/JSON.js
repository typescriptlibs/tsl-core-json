/* *
 *
 *  Declarations
 *
 * */
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
    function parse(text, reviver) {
        return globalThis.JSON.parse(text, reviver);
    }
    JSON.parse = parse;
    function find(json, path) {
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
        return step || undefined;
    }
    JSON.find = find;
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