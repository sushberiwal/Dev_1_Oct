// promises => async task => serially ?
let fs = require("fs");

let f1KaPromise = fs.promises.readFile("./f1.txt");
// chaining concept // promises hell
f1KaPromise.then(function(data){
    console.log("Content of f1 " + data);
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    f2KaPromise.then(function(data){
        console.log("Content of f2 " + data);
        let f3KaPromise = fs.promises.readFile("./f3.txt");
        f3KaPromise.then(function(data){
            console.log("Content of f3 " + data);
        });
        f3KaPromise.catch(function(err){
            console.log(err);
        });
    });
    f2KaPromise.catch(function(err){
        console.log(err);
    });
});
f1KaPromise.catch(function(err){
    console.log(err);
});



