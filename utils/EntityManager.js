const fs = require("fs");

class EntityManager {
    constructor(entity_directory = "./entities") {
        this.entity_directory = entity_directory;
    }

    getAvailable = () => {
        let files = fs.readdirSync(this.entity_directory);

        let output = {};

        for(let file in files) {
            let className = files[file].replace(/^\w/, (c) => c.toUpperCase())
                                      .replace(/.js/, "");
            let classDir = "." + this.entity_directory + "/" + files[file];
            output[className] = require(classDir)[className];
        }

        return output;
    };
}

exports.EntityManager = EntityManager;