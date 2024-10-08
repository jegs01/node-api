const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    tittle: 'Users Api',
    description: 'Users Api'
  },
  host: 'node-api-epf2.onrender.com',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
