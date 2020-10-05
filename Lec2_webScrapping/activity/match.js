let fs = require("fs");
let cheerio = require("cheerio");
let request = require("request");


function getMatch(link){
    request(link , fun);

}

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
                    processDetails(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
                }
            }
        }

    }
    // console.log("#######################################");
}

function checkTeamFolder(teamName){
    // check if a folder exists using fs
    // path => "India";
    return fs.existsSync(teamName);
}
function checkBatsmanFile(teamName , batsmanName){
    //batsmanPath = "India/MSDhoni.json";
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}
function  updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let entries = fs.readFileSync(batsmanPath);
    entries = JSON.parse(entries);
    let entry = {
        Runs : runs,
        Balls : balls,
        Fours : fours , 
        Sixes : sixes ,
        SR : strikeRate
    }
    entries.push(entry);
    fs.writeFileSync(batsmanPath , JSON.stringify(entries));

}
function createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    // India/Msdhoni.json
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    
    let entries = [];
    let entry = {
        Runs : runs,
        Balls : balls,
        Fours : fours , 
        Sixes : sixes ,
        SR : strikeRate
    }
    entries.push(entry);
    fs.writeFileSync(batsmanPath , JSON.stringify(entries));
}

function  createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}
function processDetails(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    // check if team ka folder exist ?
    let teamFolderExist = checkTeamFolder(teamName);
    if(teamFolderExist){
        //check batsmamn file
        let batsmanFileExist = checkBatsmanFile(teamName , batsmanName);
        if(batsmanFileExist){
            updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
        else{
            createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
    }
}



module.exports = getMatch;