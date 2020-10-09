let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

let fs = require("fs");



// promises => for loops use => parallel

for(let i=0 ; i<files.length ; i++){

    let fileKaP = fs.promises.readFile(files[i]);
    fileKaP.then(function(data){
        console.log("File Ka COntent " + data);
    })

}