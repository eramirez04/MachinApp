// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Mi API',
      version: '1.0.0',
      description: 'Documentación de mi API usando Swagger'
    },
  },

  apis: ["./src/routes/*.js"], 
};


const specs = swaggerJsdoc(options);


const swaggerSetup = swaggerUi.setup(specs);

export { swaggerUi, swaggerSetup };
