const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: 'Library API',
        description: 'Library API for books and users'
    },
    host: 'cse341-libraryproject.onrender.com',
    schemes: ["https"]
}

const outputFile = './swagger-output.json'
const routes = ['./server.js']

swaggerAutogen(outputFile, routes, doc)