const express = require('express')
const app = express();
const consign = require('consign');
const bodyParser = require('body-parser');
const path = require('path')
const ejs = require('ejs')

app.set('port', process.env.NODE_ENV || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign()
    .include('routes')
    .into(app)


app.listen(app.get('port'), () => {
    console.log('Running...')
});