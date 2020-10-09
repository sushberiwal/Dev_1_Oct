const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");
// puppeteer functions => pending promise
let tab;
let gIdx;
let gCode;
// gives a browser instance
let browserPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
browserPromise
  .then(function (browser) {
    let allPagesPromise = browser.pages();
    return allPagesPromise;
  })
  .then(function (pages) {
    let page = pages[0];
    tab = page;
    let pageOpenedPromise = page.goto("https://www.hackerrank.com/auth/login");
    return pageOpenedPromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-1", id);
    return idTypedPromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-2", pw);
    return idTypedPromise;
  })
  .then(function () {
    let loginPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
    return loginPromise;
  })
  .then(function () {
    let waitAndClickedP = waitAndClick("#base-card-1-link");
    return waitAndClickedP;
  })
  .then(function () {
    let waitAndClickedP = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickedP;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector(
      ".js-track-click.challenge-list-item",
      { visible: true }
    );
    return waitPromise;
  })
  .then(function () {
    // get all a Tags from that page
    let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
    // [  PP , PP , PP , PP ];
    return allATagsPromise;
  })
  .then(function (allATags) {
    // [ <a></a> , <a></a> , <a></a> , <a></a>];
    // let allLinksPromise = [Promise<data> , Promise<link> , Promise<link> , Promise<link>];
    let allLinksPromise = [];
    for (let i = 0; i < allATags.length; i++) {
      let linkPromise = tab.evaluate(function (elem) {
        return elem.getAttribute("href");
      }, allATags[i]);
      // return linkPromise; //Promise <Pending> => Promise <data>
      allLinksPromise.push(linkPromise);
    }
    // Promise.all => takes an array of pending promises
    let pp = Promise.all(allLinksPromise);
    return pp; // promise <pending>
  })
  .then(function (allLinks) {
    let completeLinks = [];
    for (let i = 0; i < allLinks.length; i++) {
      let link = allLinks[i];
      let completeLink = `https://www.hackerrank.com${link}`;
      completeLinks.push(completeLink);
    }
    // console.log(completeLinks);
    // submit a question => pending promise => then catch
    let oneQuestionSolvedPromise = submitCode(completeLinks[0]);
    
    for(let i=1 ; i<completeLinks.length ; i++){
       oneQuestionSolvedPromise = oneQuestionSolvedPromise.then(function(){
            let nextQuesSolvedPromise = submitCode(completeLinks[i]);
            return nextQuesSolvedPromise;
        })
    }
    return oneQuestionSolvedPromise;
  })
  .then(function () {
    console.log("All questions solved !!");
  })
  .catch(function (err) {
    console.log(err);
  });

function waitAndClick(selector) {
  return new Promise(function (resolve, reject) {
    let waitPromise = tab.waitForSelector(selector, { visible: true });
    waitPromise
      .then(function () {
        let clickedP = tab.click(selector);
        return clickedP;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function getCode() {
  return new Promise(function (resolve, reject) {
    let waitP = tab.waitForSelector(".hackdown-content h3", { visible: true });
    waitP
      .then(function () {
        let allH3TagsPromise = tab.$$(".hackdown-content h3");
        return allH3TagsPromise;
      })
      .then(function (allH3Tags) {
        let allCodeNamesP = [];
        // [promise<pending> , promise<pending> , promise<pending> , promise<pending>];
        for (let i = 0; i < allH3Tags.length; i++) {
          let p = tab.evaluate(function (elem) {
            return elem.textContent;
          }, allH3Tags[i]);
          allCodeNamesP.push(p);
        }
        let pp = Promise.all(allCodeNamesP);
        return pp;
      })
      .then(function (allCodesNames) {
        // proceed from here
        for (let i = 0; i < allCodesNames.length; i++) {
          if (allCodesNames[i] == "C++") {
            gIdx = i;
            break;
          }
        }
        let allCodesDivPromise = tab.$$(".hackdown-content .highlight");
        return allCodesDivPromise;
      })
      .then(function (allCodeDiv) {
        // [ <div> code </div> ,<div> code </div>, <div> code </div>  ];
        let codeDiv = allCodeDiv[gIdx];
        let codePromise = tab.evaluate(function (elem) {
          return elem.textContent;
        }, codeDiv);
        return codePromise;
      })
      .then(function (code) {
        gCode = code;
        resolve();
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

function pasteCode(){
    return new Promise(function(resolve , reject){
        let waitAndClickP = waitAndClick('.custom-input-checkbox');
        waitAndClickP.then(function(){
            let codeTypedP = tab.type('.custominput' , gCode);
            return codeTypedP;
        })
        .then(function(){
            let controlDownP = tab.keyboard.down("Control");
            return controlDownP;
        })
        .then(function(){
            let aPressP = tab.keyboard.press("A");
            return aPressP;
        })
        .then(function(){
            let xPressP = tab.keyboard.press("X");
            return xPressP;
        })
        .then(function(){
           let editorClickedP = tab.click('.monaco-scrollable-element.editor-scrollable.vs');
           return editorClickedP;
        })
        .then(function(){
            let aPressP = tab.keyboard.press("A");
            return aPressP;
        })
        .then(function(){
            let vPressP = tab.keyboard.press("V");
            return vPressP;
        })
        .then(function(){
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
    })
}


function handleLockBtn(){
    return new Promise(  function(resolve , reject) {
        let lockBtnClickedP = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary");
        lockBtnClickedP.then(function(){
            console.log("lock button clicked");
            resolve();
        })
        lockBtnClickedP.catch(function(err){
            console.log("lock Btn not found !!");
            resolve();
        })
    })
}


function submitCode(link) {
  return new Promise(function (resolve, reject) {
    let quesOpenedP = tab.goto(link);
    quesOpenedP
      .then(function () {
        let waitAndClickedP = waitAndClick("#Editorial");
        return waitAndClickedP;
      })
      .then(function(){
          let lockBtnP = handleLockBtn();
          return lockBtnP;
      })
      .then(function () {
        let getCodeP = getCode();
        return getCodeP;
      })
      .then(function(){
          let problemClickedPromise = tab.click('a[data-attr2="Problem"]');
          return problemClickedPromise;
      })
      .then(function(){
          let codePastedP = pasteCode();
          return codePastedP;
      })
      .then(function(){
         let codeSubmitP = tab.click(".pull-right.btn.btn-primary.hr-monaco-submit");
         return codeSubmitP;
      })
      .then(function(){
          resolve();
      })
      .catch(function(err){
          reject(err);
      })
  });
}
