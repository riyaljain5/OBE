const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 8000;

const router = require('./routes/route');
const route = require("./routes/percentage_route");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/', router);
app.use('/', route);
app.use('/', require('./routes/authRoutes'))

mongoose
  .connect('mongodb://127.0.0.1:27017/project')
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => console.log('Server is running on port 8000'));
  })
  .catch((err) => console.log(err));


  module.exports = app;