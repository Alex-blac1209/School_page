var {port} = require("./config/http.js");
var {EntityManager} = require("./utils/EntityManager.js");
var {Table} = require("./database/Table.js");

// HTTP server module
const express = require('express');
const express_session = require('express-session');

// Twig rendering engine
const Twig = require('twig');

// POST data middleware
var multer = require('multer');
var upload = multer();

const app = express();
app.use(express.static("public/"));

// for parsing application/json
app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 

// for session handling
app.use(express_session({
    secret: "someSecretPasswordForCookies",
    resave: false,
    saveUninitialized: true,
}));

// Setting up Twig
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

let em = new EntityManager();


//////// ROUTES //////////

// Homepage
app.get("/", (request, response) => {
    response.render("main/index.html.twig");
});

// Login page
app.get("/login", (request, response) => {
    if(request.session.user) {
        response.redirect("/");
        return;
    }
    response.render("main/login.html.twig");
});
app.post("/login", async (request, response) => {
    if(request.session.user) {
        response.redirect("/");
        return;
    }

    let username = request.body.username;
    let password = request.body.password;

    let user = new (em.getAvailable()["User"])(null, username, null, null);
    user._setPassword(password);

    let getUser = await (new Table("user")).fetchBy(["name = ?", "password = ?"], [user.name, user.password]);

    if(getUser.length >= 1) {
        request.session.user = getUser[0];
        response.redirect("/");
        return;
    }

    response.redirect("/login");
});

// Logout page
app.get("/logout", (request, response) => {
    request.session.destroy(err => {
        if(err) console.log(err);
        response.redirect("/");
    });
});

// User info page
app.get("/profile", (request, response) => {
    if(!request.session.user) {
        response.redirect("/login");
        return;
    }
    
    response.render("profile/index.html.twig", {
        user: request.session.user,
    });
});

// DEBUG ROUTES

// Debug Page
app.get("/debug", async (request, response) => {
    let debug = "No user";
    if(request.session.user)
        debug = request.session.user.name;
    let table = new Table("user");
    let users = await table.fetchAll();
    
    response.render("main/debug.html.twig", {
        debug: debug,
        users: users,
    });
});

// Insert new user
app.get("/new", async (request, response) => {
    let table = new Table("user");
    let em = new EntityManager();

    let user = new (em.getAvailable()["User"])(null, "Majroch", "jakuboch4@gmail.com");
    user._setPassword("testPassword");
    await table.insert(user);

    response.render("main/debug.html.twig", {
        debug: "Done!",
    });
});



///////// Run Server /////////////
app.listen(port, () => {
    console.log(`App is running at http://0.0.0.0:${port}`);
});
