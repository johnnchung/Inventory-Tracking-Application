const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('mongoose');
const app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'public');

const uri = require('./config/key').MongoURI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, });

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use('/', require('./routes/index'));
app.use('/inventoryCollection', require('./routes/inventoryCollection'));

app.listen(3000, function() {
    console.log('Listening on Port 3000')
})

module.exports = app