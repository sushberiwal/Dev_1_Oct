let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");

let leaderboard = [];

let count=0;

function getMatch(link){
    console.log("Sending request !!" , count);
    count++;
    request(link , fun);
}

function fun(error , res , data){
    console.log("received data !!!" , count);
    count--;
    parseData(data);
    if(count == 0){
        console.table(leaderboard);
    }

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
        // console.log(teamName);

        if(!teamName.includes("Team")){
            // array of tr [  <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr> , <tr> </tr>  ];
            let allBatsmanDetails = ch(bothInnings[i]).find(".table.batsman tbody tr");
            for(let j=0 ; j<allBatsmanDetails.length-1 ; j++){
                let detailsOfABatsman = ch(allBatsmanDetails[j]).find("td");
                if(detailsOfABatsman.length > 1){
                    // valid batsman ki details
                    let batsmanName = ch(detailsOfABatsman[0]).find("a").text().trim();
                    let runs = ch(detailsOfABatsman[2]).text().trim();
                    let balls = ch(detailsOfABatsman[3]).text().trim();
                    let fours = ch(detailsOfABatsman[5]).text().trim();
                    let sixes = ch(detailsOfABatsman[6]).text().trim();
                    let strikeRate = ch(detailsOfABatsman[7]).text().trim();
                    // String interpolation
                    // console.log(`Batsman = ${batsmanName} Balls = ${balls} Runs = ${runs} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate} `);
                    processLeaderBoard(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
                }
            }
        }

    }
    // console.log("#######################################");
}



function processLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    //"45" => 45
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    // check in leadearboard that batsman exist or not ??
    // batsman exists = true => update details
    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Team == teamName && leaderboard[i].Batsman == batsmanName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }

    // batsman nhi hai => new entry add ho jaegi
    let entry = {
        Team : teamName,
        Batsman : batsmanName ,
        Runs : runs ,
        Balls : balls ,
        Fours : fours ,
        Sixes : sixes
    }
    leaderboard.push(entry);
}

module.exports = getMatch;