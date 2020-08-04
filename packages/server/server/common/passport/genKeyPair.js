/**
 * Run this file by typing `node genKeyPair` in terminal
 */
const crypto = require('crypto'); // eslint-disable-line @typescript-eslint/no-var-requires
const fs = require('fs'); // eslint-disable-line @typescript-eslint/no-var-requires

// Generate a public and private key pair for signing and verifying jwt token
function genKeyPair() {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey);
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair();
