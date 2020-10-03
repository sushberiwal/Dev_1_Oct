let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");


request("https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019" , fun);

function fun(error , res , data){
    parseData(data);
}

function parseData(data){
    fs.writeFileSync("./match.html" , data);
}