const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');

// Generar certificado autofirmado con Node.js
const pem = require('pem');

pem.createCertificate({ days: 365, selfSigned: true }, (err, keys) => {
  if (err) {
    console.error('Error generating certificate:', err);
    process.exit(1);
  }
  
  if (!fs.existsSync('./keys')) {
    fs.mkdirSync('./keys');
  }
  
  fs.writeFileSync('./keys/key.pem', keys.serviceKey);
  fs.writeFileSync('./keys/cert.pem', keys.certificate);
  
  console.log('✅ Certificados generados exitosamente en ./keys/');
});
