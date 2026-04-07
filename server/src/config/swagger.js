const swaggerJsdoc =require ('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
        title: 'TaskFlow API',
        version: '1.0.0',
        description: 'API para gestionar tareas',
    },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ]
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;