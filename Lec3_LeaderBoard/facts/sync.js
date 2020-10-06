let fs = require("fs");


console.log("Before");


let f1KaData = fs.readFileSync("./f1.txt" , "utf-8"); // 10gb
console.log(f1KaData);



console.log("After");




