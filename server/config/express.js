const express = require('express');
const app = express();
const routes = require('../app/routes');
const path = require('path');
const bodyParser = require('body-parser');

app.set('clientPath', path.join(__dirname, '../..', 'cliente') );
console.log(app.get('clientPath'));
app.use(express.static(app.get('clientPath')));
app.use(bodyParser.json());

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "Origin, x-requested-Width, Content-Type, Accept");
    next();
})

routes(app);

module.exports = app;


