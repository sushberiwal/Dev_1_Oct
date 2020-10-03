// npm install request


let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");

// request is a module used to fetch html of a webpage 

request(  "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup" , fun );

// data => html file
// response => object , statusCode == 200
// error => page not found // link is wrong

function fun( error , response , data  ){
   // current directory => homepage.html , => html file of webpage
    let ch = cheerio.load(data);
    let aTag = ch("a[data-hover='View All Results']");
    let link = ch(aTag).attr("href");
    console.log(link);
}
