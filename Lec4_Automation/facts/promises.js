let fs = require("fs");


// pending promise
let pendingPromise =  fs.promises.readFile("./f1.txt");


console.log(pendingPromise);


pendingPromise.then(function(data){
    console.log("Content " + data);
});



pendingPromise.catch(function(err){
    console.log(err);
});