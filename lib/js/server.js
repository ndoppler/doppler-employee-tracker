const express = require('express');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', api);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
  );

module.exports = app;