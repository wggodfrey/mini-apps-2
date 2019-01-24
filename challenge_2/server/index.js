const express = require('express');
const app = express();

const path = require('path');
const morgan = require('morgan');
const axios = require('axios');
const redis = require('redis').createClient(6379, '127.0.0.1');
const moment = require('moment');

app.use(express.static(path.join(__dirname,'./../public')));
app.use(express.static(path.join(__dirname,'./../node_modules')));
app.use(morgan('combined'));

app.get('/bpi/:start/:end', (req, res) => {
  let key = 'bpi' + Object.keys(req.params).map(key => req.params[key]).join('');
  redis.get(key, (err, data) => {
    if (data) {
      res.end(data);
    } else {
      let start = req.params.start;
      let end   = req.params.end;
      axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
        .then(({data}) => {
          redis.set(key, JSON.stringify(data), () => {
            res.end(JSON.stringify(data));
          });
        })
        .catch(({message}) => res.status(500).end(message));
    }
  });
});

app.get('/:fsym/:start/:end', (req, res) => {
  let key = Object.keys(req.params).map(key => req.params[key]).join('') + '1';
  redis.get(key, (err, data) => {
    if (data) {
      res.end(data);
    } else {
      let fsym  = req.params.fsym;
      let start = moment(req.params.start);
      let end   = moment(req.params.end);
      axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${fsym.toUpperCase()}&tsym=USD&limit=${end.diff(start, 'days')}`)
        .then(({data}) => {
          redis.set(key, JSON.stringify(data.Data), () => {
            res.end(JSON.stringify(data.Data));
          });
        })
        .catch(({message}) => res.status(500).end(message));
    }
  });
});

app.listen(2000, () => {
  console.log('>>>>>>>>>> listening on port 2000');
});

