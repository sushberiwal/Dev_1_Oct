const puppeteer = require('puppeteer');
const {id,pw} = require("./credentials");
    // puppeteer functions => pending promise 
    let tab;
    // gives a browser instance
    let browserPromise = puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    });
    browserPromise.then(function(browser){
        let allPagesPromise = browser.pages();
        return allPagesPromise;
    })
    .then(function(pages){
        let page = pages[0];
        tab = page;
        let pageOpenedPromise = page.goto("https://www.hackerrank.com/auth/login");
        return pageOpenedPromise
    })
    .then(function(){
        let idTypedPromise = tab.type("#input-1" , id);
        return idTypedPromise;
    })
    .then(function(){
        let idTypedPromise = tab.type("#input-2" , pw);
        return idTypedPromise;
    })
    .then(function(){
        let loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
        return loginPromise;
    })
    .then(function(){
        console.log("logged in !!");
    })
    .catch(function(err){
        console.log(err);
    })



