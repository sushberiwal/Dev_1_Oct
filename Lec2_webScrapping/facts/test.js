const request = require("request");

let fs = require("fs");



let object = {
    "name":"asidja"
};

fs.writeFileSync("./test.json" , JSON.stringify(object));