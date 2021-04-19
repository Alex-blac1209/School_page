const port = 8000;

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


///////// Run Server /////////////
app.listen(port, () => {
    console.log(`App is running at http://0.0.0.0:${port}`);
});
