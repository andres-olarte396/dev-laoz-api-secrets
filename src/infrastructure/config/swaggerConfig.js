const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Secrets API',
      version: '1.0.0',
      description: 'API para la gestión de configuraciones seguras',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/app/routes/*.js'], // Ruta donde se encuentran las anotaciones Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;
