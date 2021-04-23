var {port} = require("./config/http.js");
var {User} = require("./entities/user.js");

// HTTP server module
const express = require('express');
// Twig rendering engine
const Twig = require('twig');

const app = express();
app.use(express.static("public/"));

// Setting up Twig
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});


//////// ROUTES //////////

// Homepage
app.get("/", (request, response) => {
    response.render("main/index.html.twig");
});

// Debug Page
app.get("/debug", async (request, response) => {
    let user = new User();
    let users = await user.fetchAll();
    response.render("main/debug.html.twig", {
        debug: users.length,
    });
});

// Insert new user
app.get("/new", async (request, response) => {
    let user = new User();
    user.insert([null, "asdf"]);
    response.render("main/debug.html.twig", {
        debug: "Done!",
    });
});



///////// Run Server /////////////
app.listen(port, () => {
    console.log(`App is running at http://0.0.0.0:${port}`);
});
