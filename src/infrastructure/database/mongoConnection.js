const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'secrets', // Reemplaza con el nombre de tu base de datos
    });
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1); // Salida del proceso en caso de error
  }
};

module.exports = connectDB;
