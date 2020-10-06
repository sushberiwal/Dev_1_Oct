// async tasks => promises => parallely files read
let fs = require("fs");

let f1KaPromise =  fs.promises.readFile("./f1.txt");
let f2KaPromise = fs.promises.readFile("./f2.txt");
let f3KaPromise = fs.promises.readFile("./f3.txt");

f1KaPromise.then(function(data){
    console.log("Content of f1 " + data);
});
f1KaPromise.catch(function(err){
    console.log(err);
});

f2KaPromise.then(function(data){
    console.log("Content of f2 " + data);
});
f2KaPromise.catch(function(err){
    console.log(err);
});

f3KaPromise.then(function(data){
    console.log("Content of f3 " + data);
});
f3KaPromise.catch(function(err){
    console.log(err);
});



