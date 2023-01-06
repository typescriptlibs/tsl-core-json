/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript Library for JSON

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License; you may not use this file except in
  compliance with the License. You may obtain a copy of the MIT License at
  https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

/* *
 *
 *  Declarations
 *
 * */

export type JSON = ( JSON.Array | JSON.Object );

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

export namespace JSON {

    /* *
     *
     *  Declarations
     *
     * */

    export interface Array extends globalThis.Array<Type>, Record<number, Type> {
        // nothing to add
    }

    export interface Object extends Record<string, Type> {
        // nothing to add
    }

    export interface ParseCallback<T = JSON> {
        (
            this: T,
            key: string,
            value: T[keyof T]
        ): ( JSON.Type | undefined );
    }

    export type Primitive = ( boolean | null | number | string );

    export interface StringifyCallback<T extends Record<string, any> = Record<string, any>> {
        (
            this: T,
            key: string,
            value: T[keyof T]
        ): any
    }
    export type Type = ( Array | Object | Primitive );

    /* *
     *
     *  Functions
     *
     * */

    export function extract (
        json: JSON,
        path: string
    ): ( JSON.Type | undefined ) {
        const pathWay = path.split( SQL_PATH_SEPARATORS_REGEXP );

        let nextJump: number;
        let step: JSON.Type = json;

        for ( let nextStep of pathWay ) {

            if (
                typeof step !== 'object' ||
                step === null
            ) {
                return;
            }

            if ( step instanceof Array ) {
                nextJump = parseInt( nextStep );

                if ( isNaN( nextJump ) ) {
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

    export function parse (
        text: string,
        reviver?: ParseCallback
    ): JSON {
        return globalThis.JSON.parse( text, reviver );
    }

    export function stringify (
        json: JSON,
        replacer: StringifyCallback,
        space?: string
    ): string {
        return globalThis.JSON.stringify( json, replacer, space );
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default JSON;
