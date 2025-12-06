const mongoose = require('mongoose');
const secretService = require('../src/app/services/secretService');
const connectDB = require('../src/infrastructure/database/mongoConnection');
const dotenv = require('dotenv');
dotenv.config();

const seedSecrets = async () => {
    try {
        // Configurar path manualmente si corre en docker
        process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/secrets';

        // Necesitamos la clave de encriptación que usa el servicio
        if (!process.env.ENCRYPTION_KEY) {
            console.error('❌ Error: ENCRYPTION_KEY no está definida en el entorno.');
            process.exit(1);
        }

        console.log('🌱 Conectando a MongoDB...');
        await connectDB();

        const secrets = [
            { app: 'authentication-api', key: 'JWT_SECRET', value: 'secret-jwt-key-seed-123' },
            { app: 'authentication-api', key: 'MONGO_URI', value: 'mongodb://mongodb:27017/webtools' },
            { app: 'user-api', key: 'MONGO_URI', value: 'mongodb://mongodb:27017/webtools' },
            { app: 'authorization-api', key: 'JWT_SECRET', value: 'secret-jwt-key-seed-123' },
            { app: 'api-gateway', key: 'LOCAL_PORT', value: '3002' }
        ];

        console.log('🌱 Sembrando secretos iniciales...');

        for (const secret of secrets) {
            try {
                await secretService.createSecret(secret.key, secret.value, secret.app);
                console.log(`✅ Secreto creado: ${secret.app} -> ${secret.key}`);
            } catch (error) {
                console.log(`⚠️ Secreto ya existe o error: ${secret.app} -> ${secret.key} (${error.message})`);
            }
        }

        console.log('✨ Seed completado. Cerrando conexión...');
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error fatal en seed:', error);
        process.exit(1);
    }
};

seedSecrets();
