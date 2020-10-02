// in dev_1_oct location
// npm init -y
// npm install cheerio


let fs = require("fs");
let cheerio = require("cheerio");

// filesystem => read file , write file etc
let fileKaData = fs.readFileSync("./index.html" ,"utf-8");
let ch = cheerio.load(fileKaData);
let h1Tag = ch("h1");
// console.log(h1Tag.text());

let PTag = ch(".list .pa").text();
// array => [  <p></p> , <p> </p> ];
console.log(PTag);
// extract element on the basis of class => dot
let pKaData = ch(".pa.outer").text();
// console.log(pKaData);


// extract element on the basis of id => hashtag
let h1KaData = ch("#unique").text();
console.log(h1KaData);