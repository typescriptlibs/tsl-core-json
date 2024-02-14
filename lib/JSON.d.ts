/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript Library for JSON

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/
export type ESArray<T> = Array<T>;
export type JSON = (JSON.Array | JSON.Object);
export declare namespace JSON {
    interface Array extends ESArray<Type>, Record<number, Type> {
    }
    interface Object extends Record<string, Type> {
    }
    interface ParseCallback<T = JSON> {
        (this: T, key: string, value: T[keyof T]): (JSON.Type | undefined);
    }
    type Primitive = (boolean | null | number | string);
    interface StringifyCallback<T extends Record<string, any> = Record<string, any>> {
        (this: T, key: string, value: T[keyof T]): any;
    }
    type Type = (Array | Object | Primitive);
    function convertGlobToRegExp(glob: string): RegExp;
    /**
     * Extracts a path in a JSON object and returns the found portion.
     *
     * @param json
     * JSON object to extract from.
     *
     * @param pathOrPatterns
     * Path in the JSON object to extract. Or an array with patterns for each
     * level.
     *
     * @return
     * JSON object or primitive, if path was found.
     */
    function extract(json: JSON, path: string): (JSON.Type | undefined);
    function extract(json: JSON, patterns: ESArray<(string | RegExp)>): (JSON.Type | undefined);
    function parse(text: string, reviver?: ParseCallback): JSON;
    function stringify(json: JSON, replacer?: StringifyCallback, space?: string): string;
}
export default JSON;
