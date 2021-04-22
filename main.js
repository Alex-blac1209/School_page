// Some Configuration
const port = 8000;
const mysql_config = {
    host: 'localhost',
    user: 'school_page',
    password: 'school_page',
    database: 'school_page'
};




// HTTP server module
const express = require('express');
// Twig rendering engine
const Twig = require('twig');
// MySQL driver
const mysql = require('mysql');

const app = express();
app.use(express.static("public/"));

// Setting up Twig
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

// Prepare MySQL connection
const db = mysql.createConnection(mysql_config);
var mysql_error = null;


//////// ROUTES //////////

// Homepage
app.get("/", (request, response) => {
    if(!mysql_error === true) {
        response.redirect("/debug");
        return;
    }
    
    response.render("main/index.html.twig");
});

// Debug Page
app.get("/debug", (request, response) => {
    response.render("main/debug.html.twig", {
        debug: mysql_error,
    });
});



///////// Run Server /////////////
app.listen(port, () => {
    db.connect(err => {
        if(err) {
            mysql_error = err.message;
            console.error("Database Connection Error: " + err.message);
        } else {
            console.log("Database connection established!");
            mysql_error = true;
        }
    });

    console.log(`App is running at http://0.0.0.0:${port}`);
});
