const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 3000;
const api = require('./routes/api');
const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));

app.use('/api', api);
app.get('/', function (_req, res) {
    res.send('Hello from your Node Server!')
});

app.listen(port, function() {
    console.log('Server online and running on port ' + port)
});