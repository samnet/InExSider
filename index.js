const express = require('express');
const path = require('path');
var cors = require('cors')

const getInsiderData = require('./get-insider-data.js')

const app = express();

app.use(cors())

app.get('/data', (req, res) => {
  return getInsiderData.getHoldings()
    .then((holdings) => {
      res.json(holdings)
    })
})
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/page.html')));

app.listen(process.env.PORT || 3000, () => console.log('Listening on port 3000!'));
