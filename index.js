const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // css, js, and image files

// connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'webappuser',
    password: 'hellothere',
    database: 'SpotifyCharts',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connection successful.');
});

require('./routes/main')(app, db);

// set ejs as the view engine
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set('views', __dirname + '/views');

app.listen(port, () =>
    console.log(`App is listening on http://localhost:${port}/`)
);
