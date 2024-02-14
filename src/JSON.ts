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

export type ESArray<T> = Array<T>;

export type JSON = ( JSON.Array | JSON.Object );

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

    export interface Array extends ESArray<Type>, Record<number, Type> {
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

    export function convertGlobToRegExp (
        glob: string
    ): RegExp {
        const pattern = glob
            .replace( /(?:(^|[^//])\*)+/g, '$1.*' )
            .replace( /(?:(^|[^//])\?)+/g, '$1.?' )
            .replace( /(?:(^|[^//])\[!)+/g, '$1[^' );

        return new RegExp( glob, 'gu' );
    }

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
    export function extract (
        json: JSON,
        path: string
    ): ( JSON.Type | undefined );
    export function extract (
        json: JSON,
        patterns: ESArray<( string | RegExp )>
    ): ( JSON.Type | undefined );
    export function extract (
        json: JSON,
        pathOrPatterns: ( string | ESArray<( string | RegExp )> )
    ): ( JSON.Type | undefined ) {

        if ( pathOrPatterns instanceof Array ) {
            return extractWithPatterns( json, pathOrPatterns );
        }

        return extractWithPath( json, pathOrPatterns );
    }

    function extractWithPath (
        json: JSON,
        path: string
    ): ( JSON.Type | undefined ) {
        const steps = path.split( '.' );

        let nextJump = NaN;
        let step: JSON.Type = json;

        for ( let nextStep of steps ) {

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

    function extractWithPatterns (
        json: JSON,
        patterns: ESArray<( string | RegExp )>
    ): ( JSON.Type | undefined ) {
        const pattern = patterns[0];
        const matches: JSON.Array = [];

        for ( const key in json ) {

            if (
                (
                    typeof pattern === 'string' &&
                    pattern === key
                ) ||
                (
                    typeof pattern === 'object' &&
                    pattern.test( `${key}` )
                )
            ) {
                let value: ( JSON.Type | undefined ) = ( json as ( JSON.Array & JSON.Object ) )[key];

                if ( patterns.length > 1 ) {

                    if (
                        value === null ||
                        typeof value !== 'object'
                    ) {
                        continue;
                    }

                    value = extractWithPatterns( value, patterns.slice( 1 ) );
                }

                if ( typeof value !== 'undefined' ) {
                    matches.push( value );
                }
            }
        }

        return ( matches.length ? matches : undefined );
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
