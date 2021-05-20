var {Table} = require("../database/Table.js");
var {EntityManager} = require("../utils/EntityManager.js");

exports.addRoutes = app => {
    // ADMIN PANEL

    // Main admin panel page
    app.get("/admin", async (request, response) => {
        if(!request.session.user) {
            response.redirect("/login");
            return;
        }
        if(request.session.user.admin != true) {
            response.redirect("/");
            return;
        }

        response.render("admin/index.html.twig", {
            user: request.session.user,
        });
    });

    app.get("/admin/users", async (request, response) => {
        if(!request.session.user) {
            response.redirect("/login");
            return;
        }
        if(request.session.user.admin != true) {
            response.redirect("/");
            return;
        }

        let users = await (new Table('user')).fetchAll();

        response.render("admin/users.html.twig", {
            users: users,
            user:  request.session.user,
        })
    });

    app.get("/admin/users/getUser", async (request, response) => {
        if(!request.session.user) {
            response.redirect("/login");
            return;
        }
        if(request.session.user.admin != true) {
            response.redirect("/");
            return;
        }

        let user = (await (new Table('user')).fetchBy(["id = ?"], [request.query.id]))[0];

        response.render("admin/user.html.twig", {
            user: user,
        });
    });

    app.get("/admin/news", async (request, response) => {
        if(!request.session.user) {
            response.redirect("/login");
            return;
        }
        if(request.session.user.admin != true) {
            response.redirect("/");
            return;
        }

        let news = await (new Table("news")).fetchAll();

        response.render("admin/news.html.twig", {
            news: news
        });
    });

    app.get("/admin/news/add", async (request, response) => {
        if(!request.session.user) {
            response.redirect("/login");
            return;
        }
        if(request.session.user.admin != true) {
            response.redirect("/");
            return;
        }

        let title = request.query.title || "";
        let description = request.query.description || "";
        let path = request.query.path || "";

        if(
            title != "" &&
            description != "" &&
            path != ""
        ) {
            let user_id = request.session.user.id;
            let em   = new EntityManager();
            let news = new (em.getAvailable()["News"])(null, title, description, user_id, path);
            let db   = new Table("news");
            await db.insert(news);

            response.redirect("/admin/news");
            return;
        }

        response.render("admin/newWpis.html.twig", {
            title: title,
            description: description,
            path: path,
            user: request.session.user,
        });
    });

    app.get("/admin/news/getNews", async (request, response) => {
        if(!request.session.user) {
            response.redirect("/login");
            return;
        }
        if(request.session.user.admin != true) {
            response.redirect("/");
            return;
        }

        let news = (await (new Table('news')).fetchBy(["id = ?"], [request.query.id]))[0];
        let author = (await (new Table("user")).fetchBy(["id = ?"], [news.author]))[0];

        response.render("admin/oneNews.html.twig", {
            news: news,
            author: author,
        });
    });
};