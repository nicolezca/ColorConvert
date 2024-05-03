const express = require('express');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/routes');
app.use('/', routes);
app.use(express.static('public/css/'))
app.use(express.static('public/js'))
app.use(express.static('assets/'))

const PORT = process.env.PORT || 4321
app.listen(PORT, () => {
    console.log(`Proyecto Levantado en puerto: http://localhost:${PORT}`)
})