let fs = require("fs");

// Async await =>
// 1. await keyword => function me use hoga and wo function
// async hona chahie


// IIFE => Immediately invoked function expression
console.log("Before");
(async function(){

      let data = await fs.promises.readFile("./f1.txt");
      console.log("Content " + data);


})();

console.log("After");
