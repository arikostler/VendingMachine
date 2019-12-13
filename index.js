const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const mysql = require('mysql');



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./routes/approutes');
routes(app);

app.use("/app/", express.static(path.join(__dirname, "/html")));
app.use("/resources/", express.static(path.join(__dirname, "/node_modules")));

app.listen(port, function () {
    console.log(`App listening: http://localhost:${port}/app`);
});