// callback function => 
// functions which are passsed as a argument to a function

let fs = require("fs");


console.log("Before");


fs.readFile("./f1.txt" , fun);
function fun(err , data){
    console.log("Content " + data);
}

console.log("After");





