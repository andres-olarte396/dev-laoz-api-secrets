const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./infrastructure/config/swaggerConfig');
const dotenv = require('dotenv');
dotenv.config();

const tlsMiddleware = require('./app/middlewares/tlsMiddleware');
const connectDB = require('./infrastructure/database/mongoConnection');
const secretRoutes = require('./app/routes/secretRoutes');

const app = express();
connectDB();

const corsOptions = {
  origin: '*',
  methods: 'POST',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', secretRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3501;
tlsMiddleware.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Documentación disponible en https://localhost:${PORT}/api-docs`);
});