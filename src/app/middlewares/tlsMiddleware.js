const fs = require('fs');
const https = require('https');

const cert = fs.readFileSync(process.env.TLS_CERT_PATH);
const key = fs.readFileSync(process.env.TLS_KEY_PATH);

module.exports = https.createServer({ cert, key });