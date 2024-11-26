const express = require('express');
const app = express();
const mongodb = require('./data/database');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  }
});
