var {port, allowRegistration} = require("./config/http.js");
var {EntityManager} = require("./utils/EntityManager.js");
var {Table} = require("./database/Table.js");

// HTTP server module
const express = require('express');
const express_session = require('express-session');

// Twig rendering engine
const Twig = require('twig');

// POST data middleware
var multer = require('multer');
const { response } = require("express");
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

//About us page 
app.get("/about_us", (request, response) => {
    response.render("main/about_us.html.twig");
});

//Students, Parents, Exams, Projects, Documents page

app.get("/for_students", (request, response) => {
    response.render("main/for_students.html.twig");
});

app.get("/for_parents", (request, response) => {
    response.render("main/for_parents.html.twig");
});

app.get("/projects", (request, response) => {
    response.render("main/projects.html.twig");
});

app.get("/exams", (request, response) => {
    response.render("main/exams.html.twig");
});

app.get("/documents", (request, response) => {
    response.render("main/documents.html.twig");
});

//News page 

app.get("/news", (request, response) => {
    response.render("main/news.html.twig");
});

//Contact page
app.get("/contact", (request, response) => {
    response.render("main/contact.html.twig");
});

//Gallery page
app.get("/gallery", (request, response) => {
    response.render("main/gallery.html.twig");
});

//Partners 
app.get("/partners", (request, response) => {
    response.render("main/partners.html.twig");
})



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

// Register page
app.get("/register", (request, response) => {
    if(allowRegistration) {
        if(request.session.user) {
            response.redirect("/");
            return;
        }

        let lastUsername = request.query.lastUsername;
        let lastEmail = request.query.lastEmail;

        response.render("main/register.html.twig", {
            lastUsername,
            lastEmail,
        });
    } else {
        response.redirect("/");
    }
});
app.post("/register", async (request, response) => {
    if(allowRegistration) {
        if(request.session.user) {
            response.redirect("/");
            return;
        }

        let username = request.body.username;
        let email = request.body.email;
        let pass1 = request.body.pass1;
        let pass2 = request.body.pass2;

        if(!username || !email || !pass1 || !pass2) {
            response.redirect(`/register?lastUsername=${username}&lastEmail=${email}`);
            return;
        }

        if(pass1 != pass2) {
            response.redirect(`/register?lastUsername=${username}&lastEmail=${email}`);
            return;
        }

        // Now, we can register user!
        let table = new Table("user");
        let em = new EntityManager();

        let user = new (em.getAvailable()["User"])(null, username, email);
        user._setPassword(pass1);
        await table.insert(user);

        response.redirect("/postRegister");
    } else {
        response.redirect("/");
    }
});

// Post-Register page
app.get("/postRegister", (request, response) => {
    response.render("main/postRegister.html.twig");
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


///////// Run Server /////////////
app.listen(port, () => {
    console.log(`App is running at http://0.0.0.0:${port}`);
});
