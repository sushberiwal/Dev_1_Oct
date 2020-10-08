const puppeteer = require('puppeteer');

    // puppeteer functions => pending promise 

    // gives a browser instance
    let browserPromise = puppeteer.launch({
        headless:false
    });
    browserPromise.then(function(browser){
        let allPagesPromise = browser.pages();
        return allPagesPromise;
    })
    .then(function(pages){
        let page = pages[0];
        let pageOpenedPromise = page.goto("https://www.google.com");
        return pageOpenedPromise
    })
    .then(function(){
        console.log("google opened !");
    })

    .catch(function(err){
        console.log(err);
    })
