var crypto = require("crypto");

class User {
    constructor(id = null, name = null, email = null, password = null, admin = false) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.admin = admin;
    }

    _setPassword = (password) => {
        let newPassword = crypto.createHash("sha512").update(password).digest("hex");
        this.password = newPassword;
    };
}

exports.User = User;