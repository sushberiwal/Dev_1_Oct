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
    await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
    // await waitAndClick("#base-card-1-link");
    await waitAndClick('a[data-analytics="NavBarProfileDropDown"]');
    await page.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await page.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await page.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[bothLis.length-1];
    await manageChallengeLi.click();
    await waitAndClick('.btn.btn-green.backbone.pull-right');

})();

async function waitAndClick(selector){
   await tab.waitForSelector(selector, { visible: true });
   await tab.click(selector);
}