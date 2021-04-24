let tables = {
    user: "id int primary key auto_increment, name text not null unique, email text not null, password varchar(512) not null"
};

exports.tables = tables;