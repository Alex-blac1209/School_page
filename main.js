var {port} = require("./config/http.js");
var {EntityManager} = require("./utils/EntityManager.js");
var {Table} = require("./database/Table.js");

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


let table = new Table("user", "id int primary key auto_increment, name text, email text");
let em = new EntityManager();

//////// ROUTES //////////

// Homepage
app.get("/", (request, response) => {
    response.render("main/index.html.twig");
});

// Debug Page
app.get("/debug", async (request, response) => {
    console.log(await table.fetchBy(["id = ?"], [2]));
    console.log(await table.fetchAll());
    response.render("main/debug.html.twig", {
        debug: "LOL",
    });
});

// Insert new user
app.get("/new", async (request, response) => {
    let user = new (em.getAvailable()["User"])(null, "Majroch", "jakuboch4@gmail.com");
    await table.insert(user);
    response.render("main/debug.html.twig", {
        debug: "Done!",
    });
});



///////// Run Server /////////////
app.listen(port, () => {
    console.log(`App is running at http://0.0.0.0:${port}`);
});
