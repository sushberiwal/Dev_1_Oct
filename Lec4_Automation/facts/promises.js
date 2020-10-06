let fs = require("fs");




let pendingPromise =  fs.promises.readFile("./f1.txt");
// console.log(pendingPromise);



// pendingPromise => fullfill
pendingPromise.then(function(data){
    console.log("Content of f1 " + data);
});


//pendingPromise => fail
pendingPromise.catch(function(err){
    console.log(err);
});