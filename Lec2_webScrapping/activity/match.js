let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");


request("https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019" , fun);

function fun(error , res , data){
    parseData(data);
}

function parseData(data){
    let ch = cheerio.load(data);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
    // fs.writeFileSync("bothInnings.html" , bothInnings);
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        // Australia Innings (50 overs maximum)
        // ["Australia" , "(50 overs maximum)" ];
        teamName = teamName.split("Innings")[0].trim();
        console.log(teamName);

    }
}