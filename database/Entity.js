const {mysql_config} = require("../config/mysql.js");
const mysql = require('mysql2/promise');

class Entity {
    constructor(tableName, values) {
        this.tableName = tableName;
        this.values = values;
        this.createTable();
    }

    createTable = async () => {
        const db = await mysql.createConnection(mysql_config);

        let table = `create table if not exists ${this.tableName}(${this.values});`;

        await db.query(table);

        await db.end();
    };

    fetchAll = async () => {
        const db = await mysql.createConnection(mysql_config);

        let query = `select * from ${this.tableName};`;

        let [rows, fields] = await db.query(query);

        await db.end();

        return rows;
    };

    fetchBy = async (criteria, values=[]) => {
        const db = await mysql.createConnection(mysql_config);

        let query = `select * from ${this.tableName} where `;

        for(let x = 0; x < criteria.length; x++) {
            query += criteria[x];
            if(x + 1 != criteria.length) {
                query += " and ";
            } else {
                query += ";";
            }
        }

        let [rows, fields] = await db.query(query, values);

        await db.end();

        return rows;
    };

    insert = async (values) => {
        const db = await mysql.createConnection(mysql_config);

        let query = `insert into ${this.tableName} values(?)`;

        await db.query(query, values);

        await db.end();
    };
}

exports.Entity = Entity;