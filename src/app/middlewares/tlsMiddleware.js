const fs = require('fs');

const certPath = process.env.CERT_PATH || './keys/cert.pem';
const keyPath = process.env.KEY_PATH || './keys/key.pem';

const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

module.exports = { cert, key };
