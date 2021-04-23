const mysql_config = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'school_page',
    password: process.env.DATABASE_PASSWORD || 'school_page',
    database: process.env.DATABASE_DB || 'school_page'
};

exports.mysql_config = mysql_config;