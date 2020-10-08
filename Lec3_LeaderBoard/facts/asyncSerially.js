// async way me files read
// Serially


let fs = require("fs");


console.log("Before");

let a = false;

fs.readFile("./f1.txt" , function(err,data){
    console.log("COntent " + data);
    a=true;
    fs.readFile("./f2.txt" , function(err,data){
        console.log("COntent " + data);
        fs.readFile("./f3.txt" , function(err,data){
            console.log("COntent " + data);
        })
    })
})

if(a == true){
console.log("i am true");
}



console.log("After");
