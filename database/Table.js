const {mysql_config} = require("../config/mysql.js");
const mysql = require('mysql2/promise');
const {EntityManager} = require('../utils/EntityManager.js');

class Table {
    constructor(tableName, values) {
        this.tableName = tableName;
        this.entityName = this.tableName.replace(/^\w/, (c) => c.toUpperCase());
        this.values = values;
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
            v2 = [];

        for(let key in object) {
            v1[v1.length] = key;
            if(object[key])
                v2[v2.length] = "'" + object[key] + "'";
            else
                v2[v2.length] = "null";

        }

        let query = `insert into ${this.tableName} values(${v2.join(", ")})`;

        console.log(query);

        await db.query(query);

        await db.end();
    };
}

exports.Table = Table;