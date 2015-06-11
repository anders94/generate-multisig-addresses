var bitcoin = require('bitcoinjs-lib');

for (var x=0; x<100; x++) {
    console.log(makeAddress());
    console.log();
}

function makeAddress() {
    var privKeys = [ bitcoin.ECKey.makeRandom(), 
		     bitcoin.ECKey.makeRandom(), 
		     bitcoin.ECKey.makeRandom() ];

    var pubKeys = privKeys.map(function(x) { return x.pub });

    var redeemScript = bitcoin.scripts.multisigOutput(2, pubKeys);
    var scriptPubKey = bitcoin.scripts.scriptHashOutput(redeemScript.getHash());
    var address = bitcoin.Address.fromOutputScript(scriptPubKey).toString();

    var o = {};
    o.address = address;
    o.redeemScript = redeemScript.toHex();
    o.privateKeys = privKeys.map(function(x) { return x.toWIF() });

    return o;
}


