const puppeteer = require("puppeteer");
const {id , pw} = require("./credentials");
let challenges = require("./challenges");
// [ {} , {} , {} ,{} ,{} ]
let tab;

(async function(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });
    let pages = await browser.pages();
    let page = pages[0];
    tab = page;
    await page.goto("https://www.hackerrank.com/auth/login");
    await page.type("#input-1", id);
    await page.type("#input-2", pw);
    await Promise.all(  [ page.waitForNavigation({waitUntil:"networkidle0"})  ,   page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button")  ] );
    await waitAndClick('a[data-analytics="NavBarProfileDropDown"]');
    await Promise.all(  [ page.waitForNavigation({waitUntil:"networkidle0"})  ,   page.click('a[data-analytics="NavBarProfileDropDownAdministration"]') ] );
    await page.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await page.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[bothLis.length-1];
    await Promise.all(  [ page.waitForNavigation({waitUntil:"networkidle0"})  , manageChallengeLi.click()  ]);
    let url = await page.url();
    await waitAndClick('.btn.btn-green.backbone.pull-right');
    await createChallenge(challenges[0]);
    // one challenge is created
    for(let i=1 ; i<challenges.length ; i++){
      await page.goto(url);
      await waitAndClick('.btn.btn-green.backbone.pull-right');
      await createChallenge(challenges[i]);
    }

})();

async function waitAndClick(selector){
   await tab.waitForSelector(selector, { visible: true });
   await tab.click(selector);
}


async function createChallenge(challenge){
  try{
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    await tab.waitForSelector("#name" , {visible:true});
    await tab.type("#name" , challengeName);
    await tab.type("#preview" , description);
    await tab.waitForSelector("#problem_statement-container .CodeMirror textarea" , {visible:true});
    await tab.type("#problem_statement-container .CodeMirror textarea" , problemStatement);
    await tab.type("#input_format-container .CodeMirror textarea" , inputFormat);
    await tab.type("#constraints-container .CodeMirror textarea" , constraints);
    await tab.type("#output_format-container .CodeMirror textarea" , outputFormat);
    await tab.type("#tags_tag" , tags);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");
  }
  catch(err){
    return err;
  }
}