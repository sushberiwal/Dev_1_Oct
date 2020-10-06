let fs = require("fs");

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];



// async task => for loop // while loop => Parallelly


for(let i=0 ; i<files.length ; i++){
    console.log("Sending request");
    fs.readFile(files[i] , function(err,data){
        console.log("received data");
        console.log("Content " + data );
    })
}



