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

test( 'JSON.extract', ( assert: test.Assert ) => {

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
        'Path result should be expected result.'
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

} );
