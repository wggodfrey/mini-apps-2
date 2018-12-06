const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const axios = require('axios');

app.use(express.static(path.join(__dirname,'./../public')));
app.use(express.static(path.join(__dirname,'./../node_modules')));
app.use(morgan('combined'));

app.get('/bpi/:start/:end', (req, res) => {
  let start = req.params.start;
  let end   = req.params.end;
  console.log(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(({data}) => res.send(JSON.stringify(data)))
    .catch(({message}) => res.status(500).end(message));
})

app.listen(2000, () => {
  console.log('>>>>>>>>>> listening on port 2000');
});

