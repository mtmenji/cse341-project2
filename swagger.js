const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
    title: 'Book API',
    description: 'Book API'
    },
    host: 'cse341-project2-a570.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);