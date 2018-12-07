const NFC = require('nfc-pcsc').NFC;
const nfc = new NFC();
console.log( 'Started...' );

nfc.on( 'reader', function( reader ) {
	console.log( reader.reader.name + ' device attached' );

	reader.on( 'card', function ( card ) {
		console.log( card )
	} );

	reader.on( 'error', function ( err ) {
		console.log( reader.reader.name + ' an error occurred', err );
	});

	reader.on( 'end', function () {
		console.log( reader.reader.name + ' device removed' );
	});
});

nfc.on( 'error', function ( err ) {
	console.log( 'an error occurred', err );
} );
