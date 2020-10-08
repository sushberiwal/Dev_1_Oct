let fs = require("fs");

function readFilePromisified(path){
    return new Promise(function(resolve , reject){

        fs.readFile(path , function(err,data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })

    });
}



// pending promise
let pendingPromise = readFilePromisified("./f1.txt");
console.log(pendingPromise);

pendingPromise.then( function(data){
    console.log("Content " + data);
} );

pendingPromise.catch(function(err){
    console.log(err);
});