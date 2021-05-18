let tables = {
    user: "id int primary key auto_increment, name text not null unique, email text not null, password varchar(512) not null, admin bool not null default false",
    news: "id int primary key auto_increment, title text not null, description text not null, author int, path text",
};

exports.tables = tables;