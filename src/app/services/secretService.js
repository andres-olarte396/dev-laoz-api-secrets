const Secret = require('../../domain/models/secretModel');
const { encrypt, decrypt } = require('../../infrastructure/encryption/crypto');

const createSecret = async (key, value, app) => {
  const encryptedValue = encrypt(value);
  const secret = new Secret({ key, value: encryptedValue, app });
  await secret.save();
  return { key, value, app }; // Devuelve solo el valor original
};

const getSecret = async (key, app) => {
  console.log(key, app);
  const secret = await Secret.findOne({ key });
  if (!secret || secret.app !== app) {
    throw new Error('Secreto no encontrado');
  }
  return { key, value: decrypt(secret.value) };
};

module.exports = { getSecret, createSecret };
