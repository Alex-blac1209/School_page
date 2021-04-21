// Some Configuration
const port = 8000;
const mysql_config = {
    host: 'localhost',
    user: 'school_page',
    password: 'school_page',
    database: 'school_page'
};

const MYSQL_CONNECTED = "authenticated";




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



//////// ROUTES //////////

// Homepage
app.get("/", (request, response) => {
    if(!db.state == MYSQL_CONNECTED) response.redirect("/debug");
    
    response.render("main/index.html.twig");
});

// Debug Page
app.get("/debug", (request, response) => {
    response.render("main/debug.html.twig", {
        debug: "Hello World!",
    });
});



///////// Run Server /////////////
app.listen(port, () => {
    db.connect(err => {
        if(err) return console.error("Database Connection Error: " + err.message);
        console.log("Database connection established!");
    });

    console.log(`App is running at http://0.0.0.0:${port}`);
});
