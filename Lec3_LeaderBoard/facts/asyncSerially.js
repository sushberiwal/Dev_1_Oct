// async way me files read
// Serially


let fs = require("fs");


console.log("Before");

fs.readFile("./f1.txt" , function(err,data){
    console.log("COntent " + data);
    fs.readFile("./f2.txt" , function(err,data){
        console.log("COntent " + data);
        fs.readFile("./f3.txt" , function(err,data){
            console.log("COntent " + data);
        })
    })
})


console.log("After");
