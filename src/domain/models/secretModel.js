const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  app: { type: String, required: true, unique: true },
  value: { type: String, required: true }, // Almacenado cifrado
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Secret', secretSchema);
