
const NFC = require('nfc-pcsc').NFC;
//const ks = require('node-key-sender');
const nfc = new NFC();
console.log( 'Started...' );

var lastID;
const robot = require("robotjs");


nfc.on( 'reader', function( reader ) {
	reader.autoProcessing = false;


	console.log( reader.reader.name + ' device attached' );

	reader.on( 'card', function ( card ) {
		console.log( card )

		const packet = new Buffer([ 0xff, 0xca, 0x00, 0x00, 0x00 ]);
		const response = reader.transmit(packet, 12).then( function( data ) {
			if (data.length < 2) {
				console.log( `Invalid response length ${response.length}. Expected minimal length was 2 bytes.`);
				return;
			}
			const statusCode = data.slice(-2).readUInt16BE(0);
			if (statusCode !== 0x9000) {
				console.log( 'Could not get card UID.' );
				return;
			}
			const uid = data.slice(0, -2).toString('hex');
			newTag( uid.toUpperCase() );
		});

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

function newTag( uid ) {
	console.log( 'New tag: ' + uid );
	// Type "Hello World" then press enter.

// Type "Hello World".
 robot.typeString(uid);

 // Press enter.
	robot.keyTap("enter");
}
