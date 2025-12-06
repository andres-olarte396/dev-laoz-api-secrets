const mongoose = require('mongoose');
// Usar ruta absoluta dentro del contenedor
const secretService = require('/app/src/app/services/secretService');
const connectDB = require('/app/src/infrastructure/database/mongoConnection');
const dotenv = require('dotenv');
dotenv.config();

const seedSecrets = async () => {
    try {
        console.log('🌱 Start seed...');
        // Force URI and KEY from env vars available in container
        process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/secrets';
        
        // Connect directly
        await mongoose.connect(process.env.MONGO_URI, { dbName: 'secrets' });
        console.log('✅ Connected to MongoDB');

        const create = async (k, v, a) => {
             // Direct call to service
             try {
                await secretService.createSecret(k, v, a);
                console.log(`Created: ${a} -> ${k}`);
             } catch(e) {
                console.log(`Error/Exists: ${a} -> ${k}: ${e.message}`);
             }
        };

        await create('JWT_SECRET', 'secret-jwt-key-seed-123', 'authentication-api');
        await create('MONGO_URI', 'mongodb://mongodb:27017/webtools', 'authentication-api');
        await create('MONGO_URI', 'mongodb://mongodb:27017/webtools', 'user-api');
        await create('JWT_SECRET', 'secret-jwt-key-seed-123', 'authorization-api');
        await create('LOCAL_PORT', '3002', 'api-gateway');

        console.log('Seed Done');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
seedSecrets();
