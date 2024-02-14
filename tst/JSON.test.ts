/*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*!*\

  TypeScript Library for JSON

  Copyright (c) TypeScriptLibs and Contributors

  Licensed under the MIT License.
  You may not use this file except in compliance with the License.
  You can get a copy of the License at https://typescriptlibs.org/LICENSE.txt

\*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*i*/

import JSON from 'tsl-core-json';
import test from '@typescriptlibs/tst';

const testObject: JSON.Object = {
    'null': null,
    'false': false,
    'true': true,
    'NaN': NaN,
    'zero': 0,
    'one': 1,
    'float': 1.1,
    'string': 'string',
    'array': [
        null,
        false,
        true,
        NaN,
        0,
        1,
        1.1,
        'string',
        [
            null,
            false,
            true,
            NaN,
            0,
            1,
            1.1,
            'string'
        ],
        {
            'null': null,
            'false': false,
            'true': true,
            'NaN': NaN,
            'zero': 0,
            'one': 1,
            'float': 1.1,
            'string': 'string'
        }
    ],
    'object': {
        'null': null,
        'false': false,
        'true': true,
        'NaN': NaN,
        'zero': 0,
        'one': 1,
        'float': 1.1,
        'string': 'string',
        'array': [
            null,
            false,
            true,
            NaN,
            0,
            1,
            1.1,
            'string'
        ],
        'object': {
            'null': null,
            'false': false,
            'true': true,
            'NaN': NaN,
            'zero': 0,
            'one': 1,
            'float': 1.1,
            'string': 'string'
        }
    },
    'patterns': [
        {
            'az': 'az',
            'bz': 'bz',
            'cz': 'cz'
        },
        {
            'bz': 'bz',
            'dz': 'dz',
            'pz': 'pz',
            'qz': 'qz',
        }
    ]
};

test( 'JSON.extract with path', ( assert: test.Assert ) => {

    let result: ReturnType<typeof JSON.extract>;

    assert.strictEqual(
        JSON.extract( testObject, 'false' ),
        false,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'float' ),
        1.1,
        'Path result should be expected result.'
    );

    result = JSON.extract( testObject, 'NaN' );

    assert.ok(
        typeof result === 'number' && isNaN( result ),
        `Path result should be expected result. ${result}`
    );

    assert.strictEqual(
        JSON.extract( testObject, 'null' ),
        null,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'one' ),
        1,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'string' ),
        'string',
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'true' ),
        true,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'zero' ),
        0,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'array.4' ),
        0,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'array.8.4' ),
        0,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'array.9.zero' ),
        0,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'object.zero' ),
        0,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'object.array.0' ),
        null,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.extract( testObject, 'object.object.zero' ),
        0,
        'Path result should be expected result.'
    );

} );

test( 'JSON.extract with pattern', ( assert: test.Assert ) => {

    let result: ( JSON.Type | undefined );

    result = JSON.extract( testObject, [/^[ar]{4,4}y$/gu, /^[7-9]$/gu, 'null'] );
    assert.ok(
        result instanceof Array,
        `Pattern result should be expected type. (${typeof result})`
    );

    result = result[0];
    assert.ok(
        result instanceof Array,
        `Pattern result should be expected type. (${typeof result})`
    );

    result = result[0];
    assert.ok(
        result instanceof Array,
        `Pattern result should be expected type. (${typeof result})`
    );

    assert.strictEqual(
        result[0],
        null,
        `Pattern result should be expected result. (${result})`
    );

    result = JSON.extract( testObject, ['object', 'object', 'zero'] );
    assert.ok(
        result instanceof Array,
        `Pattern result should be expected type. (${typeof result})`
    );

    result = result[0];
    assert.ok(
        result instanceof Array,
        `Pattern result should be expected type. (${typeof result})`
    );

    result = result[0];
    assert.ok(
        result instanceof Array,
        `Pattern result should be expected type. (${typeof result})`
    );

    assert.strictEqual(
        result[0],
        0,
        `Pattern result should be expected result. (${result})`
    );

} );
