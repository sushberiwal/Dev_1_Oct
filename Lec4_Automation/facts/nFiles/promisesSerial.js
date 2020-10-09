let files = ["../f1.txt", "../f2.txt", "../f3.txt"];

let fs = require("fs");

// promises => for loops use => parallel

let fileKaPromise = fs.promises.readFile(files[0]);

for (let i = 1; i < files.length; i++) {
  
    fileKaPromise = fileKaPromise.then(function (data) {
    console.log("Content " + data);
    let nextFilePromise = fs.promises.readFile(files[i]);
    return nextFilePromise;
  });
}

fileKaPromise.then(function(data){
    console.log("Content " + data);
});

