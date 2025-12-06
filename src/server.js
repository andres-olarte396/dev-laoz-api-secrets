const cors = require('cors');
const express = require('express');
const https = require('https');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./infrastructure/config/swaggerConfig');
const dotenv = require('dotenv');
dotenv.config();

const tlsCredentials = require('./app/middlewares/tlsMiddleware');
const connectDB = require('./infrastructure/database/mongoConnection');
const secretRoutes = require('./app/routes/secretRoutes');

const app = express();
connectDB();

const corsOptions = {
  origin: '*',
  methods: 'POST,GET',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', secretRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3501;

// Crear servidor HTTPS con las credenciales TLS
const httpsServer = https.createServer(tlsCredentials, app);

httpsServer.listen(PORT, () => {
  console.log(`Servidor de secretos corriendo en el puerto ${PORT}`);
  console.log(`Documentación disponible en https://localhost:${PORT}/api-docs`);
});
