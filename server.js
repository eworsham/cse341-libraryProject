const express = require('express');
const app = express();
const mongodb = require('./data/database');
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')

const PORT = process.env.PORT || 3000;

// Swagger Middleware
app.use('/api-docs', swaggerUI.serve)
app.use('/api-docs', swaggerUI.setup(swaggerDocument))

// Routes
app.use('/', require('./routes'))

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  }
});
