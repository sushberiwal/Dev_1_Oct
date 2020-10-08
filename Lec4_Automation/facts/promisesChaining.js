let fs = require("fs");


let f1KaPromise = fs.promises.readFile("./f1.txt");

f1KaPromise.then(function(data){
    console.log("Content of F1 " + data);
})
.then(function(){
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(data){
    console.log("F2 ka data" + data);
})
.then(function(){
    let f3KaPromise = fs.promises.readFile("./f3.txt");
    return f3KaPromise;
})
.then(function(data){
    console.log("F3 ka data" + data);
})
.catch(function(err){
    console.log(err);
})


