const {Entity} = require("../database/Entity.js");

class User extends Entity {
    constructor() {
        let values = "id int primary key auto_increment, name text";

        super("user", values);
    }
}

exports.User = User;