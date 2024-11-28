const swaggerAutogen = require('swagger-autogen')

// dev environment
const docDev = {
    info: {
        title: 'Library API',
        description: 'Library API for books and users'
    },
    host: 'localhost:3000',
    schemes: ["http"],
    definitions: {
        CreateUser: {
            first_name: "First Name",
            last_name: "Last Name",
            phone_number: "111-111-1111",
            member_since: "2024",
            books_checked_out: [
                {
                    book_id: "6747b53a48dfb390a744fae7"
                }
            ]
        }
    }
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
    schemes: ["https"],
    definitions: {
        CreateUser: {
            first_name: "First Name",
            last_name: "Last Name",
            phone_number: "111-111-1111",
            member_since: "2024",
            books_checked_out: [
                {
                    book_id: "6747b53a48dfb390a744fae7"
                }
            ]
        }
    }
}

const outputFile = './swagger-output.json'
const routes = ['./server.js']

swaggerAutogen(outputFile, routes, doc)