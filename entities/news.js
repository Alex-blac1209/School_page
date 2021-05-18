class News {
    constructor(id = null, title = null, description = null, author = null, path = null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.path = path;
    }
}

exports.News = News;