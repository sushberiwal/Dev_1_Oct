let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
const getMatch = require("./match");


function getAllMatches(link){
    request( link , fun );
}

function fun(error , res , data){
    parseData(data);
}

function parseData(data){
    // fs.writeFileSync("./allMatches.html" , data);
    let ch = cheerio.load(data);
    let allATags = ch('a[data-hover="Scorecard"]');
    // console.log(allATags.length);
    for(let i=0 ; i<allATags.length ; i++){
        let link = ch(allATags[i]).attr("href");
        let completeLink =  "https://www.espncricinfo.com"+link;
        // console.log(completeLink);
        getMatch(completeLink);
    }

}

module.exports = getAllMatches;