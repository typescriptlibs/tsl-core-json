import JSON from 'tsl-core-json';
import test from '@typescriptlibs/tst';

const testObject: JSON.Object = {
    'false': false,
    'float': 1.1,
    'NaN': NaN,
    'null': null,
    'one': 1,
    'string': 'string',
    'true': true,
    'zero': 0
};

test( 'JSON.trace', ( assert: test.Assert ) => {

    let result: ReturnType<typeof JSON.trace>;

    assert.strictEqual(
        JSON.trace( testObject, 'false' ),
        false,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.trace( testObject, 'float' ),
        1.1,
        'Path result should be expected result.'
    );

    result = JSON.trace( testObject, 'NaN' );

    assert.ok(
        typeof result === 'number' && isNaN( result ),
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.trace( testObject, 'null' ),
        null,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.trace( testObject, 'one' ),
        1,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.trace( testObject, 'string' ),
        'string',
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.trace( testObject, 'true' ),
        true,
        'Path result should be expected result.'
    );

    assert.strictEqual(
        JSON.trace( testObject, 'zero' ),
        0,
        'Path result should be expected result.'
    );

} );
