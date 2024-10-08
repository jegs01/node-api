const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    tittle: 'Users Api',
    description: 'Users Api'
  },
  host: 'node-api-epf2.onrender.com',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
