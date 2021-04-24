const {mysql_config} = require("../config/mysql.js");
const mysql = require('mysql2/promise');
const {EntityManager} = require('../utils/EntityManager.js');
const {tables} = require("../config/tables.js");

class Table {
    constructor(tableName) {
        this.tableName = tableName;
        this.entityName = this.tableName.replace(/^\w/, (c) => c.toUpperCase());
        this.values = tables[this.tableName];
        this.create();
    }

    create = async () => {
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

        let em = new EntityManager();

        let output = [];
        for(let row in rows) {
            let object = new (em.getAvailable()[this.entityName])();
            for(let field in fields) {
                object[fields[field].name] = rows[row][fields[field].name];
            }
            output[output.length] = object;
        }

        return output;
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

        let em = new EntityManager();

        let output = [];
        for(let row in rows) {
            let object = new (em.getAvailable()[this.entityName])();
            for(let field in fields) {
                object[fields[field].name] = rows[row][fields[field].name];
            }
            output[output.length] = object;
        }

        return output;
    };

    insert = async (object) => {
        const db = await mysql.createConnection(mysql_config);

        let v1 = [],
            v2 = [],
            v2_placeholder = [];

        for(let key in object) {
            v1[v1.length] = key;
            v2_placeholder[v2_placeholder.length] = "?"
            v2[v2.length] = object[key];
        }

        let query = `insert into ${this.tableName}(${v1.join()}) values(${v2_placeholder.join()})`;

        await db.query(query, v2);

        await db.end();
    };
}

exports.Table = Table;