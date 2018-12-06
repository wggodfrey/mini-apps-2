const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan')

app.use(express.static(path.join(__dirname,'./../public')));
app.use(express.static(path.join(__dirname,'./../node_modules')));
app.use(morgan('combined'));

app.listen(2000, () => {
  console.log('>>>>>>>>>> listening on port 2000');
});

