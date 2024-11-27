const swaggerAutogen = require('swagger-autogen')

// dev environment
const docDev = {
    info: {
        title: 'Library API',
        description: 'Library API for books and users'
    },
    host: 'localhost:3000',
    schemes: ["http"]
}

const outputFileDev = './swagger-output-dev.json'
const routesDev = ['./server.js']

swaggerAutogen(outputFileDev, routesDev, docDev)

// Prod environment
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