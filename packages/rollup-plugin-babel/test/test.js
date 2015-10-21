var assert = require( 'assert' );
var rollup = require( 'rollup' );
var babelPlugin = require( '..' );

process.chdir( __dirname );

describe( 'rollup-plugin-babel', function () {
	it( 'runs code through babel', function () {
		return rollup.rollup({
			entry: 'samples/basic/main.js',
			plugins: [ babelPlugin() ]
		}).then( function ( bundle ) {
			const generated = bundle.generate();
			const code = generated.code;

			assert.ok( code.indexOf( 'const' ) === -1, generated.code );
		});
	});

	it( 'adds helpers', function () {
		return rollup.rollup({
			entry: 'samples/class/main.js',
			plugins: [ babelPlugin() ]
		}).then( function ( bundle ) {
			const generated = bundle.generate();
			const code = generated.code;

			assert.ok( code.indexOf( 'babelHelpers.classCallCheck =' ) !== -1, generated.code );
		});
	});
});
