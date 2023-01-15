/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/document-helper.js":
/*!****************************************!*\
  !*** ./src/modules/document-helper.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DocumentHelper": () => (/* binding */ DocumentHelper)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/modules/helper.js");


class DocumentHelper {

  constructor (document, transactions) {
    this.document = document;
    this.transactions = transactions;

    this.getKeyElements();
  }

  getKeyElements () {
    this.body =               this.document.querySelector("body");

    this.divTopCategories =   this.document.querySelector(".top-categories");
    this.headerH1 =           this.document.querySelector("header h1");
    this.headerH2 =           this.document.querySelector("header h2");
    this.totalSpendEl =       this.document.querySelector("#total-spend");
    this.emmaPortionEl =      this.document.querySelector("#emma-portion");
  }

  addHeaderDates () {
    // const headerH1 = document.querySelector("header h1");
    let newH1Text = this.headerH1.textContent;
    newH1Text += this.transactions.monthYear;
    this.headerH1.textContent = newH1Text;

    // const headerH2 = document.querySelector("header h2");
    let newH2Text = this.transactions.minDate + " - " + this.transactions.maxDate;
    this.headerH2.textContent = newH2Text;
  }

  addTotalSpends () {
    this.totalSpendEl.textContent = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.formatDollar)(this.transactions.totalSpend, 0);
    this.emmaPortionEl.textContent = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.formatDollar)(this.transactions.emmaPortion, 0);
  }

  addTopCategory (cat, val) {
    // Add category summary
    let newCatItem = this.document.createElement("div");
    newCatItem.classList.add("top-cat-item");

      let newImg = this.document.createElement("img");
      newImg.setAttribute("src", (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getImg)(cat));
      newCatItem.appendChild(newImg);

      let newCatInfo = this.document.createElement("div");
      newCatInfo.classList.add("top-cat-info");
        let newCatAmt = this.document.createElement("h3");
        newCatAmt.textContent = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.formatDollar)(val, 0);
        newCatInfo.appendChild(newCatAmt);

        let newCatCat = this.document.createElement("h4");
        newCatCat.textContent = cat;
        newCatInfo.appendChild(newCatCat);
      newCatItem.appendChild(newCatInfo);

    this.divTopCategories.appendChild(newCatItem);
  }

  addAllTopCategories () {
    for (let i=0; i<this.transactions.topCats.length; i++) {
      this.addTopCategory(this.transactions.topCats[i], this.transactions.topVals[i]);
    }
  }

  createTransPages () {
    // this.transPagesCount = Math.floor(this.transactions.numberOfTransactions/10) + 1;

    let currPage;
    for (let tNum=0; tNum<this.transactions.numberOfTransactions; tNum++) {
      if (tNum%10 == 0) {
        this.currPage = this.createPage(tNum/10 + 2);
        this.addTitle();
        this.createTable();
        this.body.appendChild(this.currPage);
      }

      this.appendRow(tNum);
    }
  }

  createPage(pageNum) {
    let newPage = this.document.createElement('div');
    newPage.setAttribute("id", `page-${pageNum}`);
    newPage.classList.add("transactions");
    return newPage;
  }

  addTitle () {
    let newH1 = this.document.createElement('h1');
    let newTitle = (this.currPage.id == "page-2" ? "Transactions" : "Transactions (cont'd)");
    newH1.textContent = newTitle;
    this.currPage.appendChild(newH1);
  }

  createTable () {
    let colNames = [" ", "Date", "Vendor", "Amount"];

    let newTable = this.document.createElement('table');
    let newTHead = this.document.createElement('thead');
    let newTR = this.document.createElement('tr');

    let newTH;
    for (let i=0; i<colNames.length; i++) {
      newTH = this.document.createElement('th');
      newTH.setAttribute("scope", "col");
      newTH.textContent = colNames[i];
      newTR.appendChild(newTH);
    }

    newTHead.appendChild(newTR);
    newTable.appendChild(newTHead);
    newTable.appendChild(this.document.createElement("tbody"));

    this.currPage.appendChild(newTable);
  }

  appendRow (tNum) {
    // page, cat, date, vendor, amount
    let page_i = Math.floor(tNum/10) + 2;
    let catImg_i = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getImg)(this.transactions.cats[tNum]);
    let date_i = this.transactions.dateToString(tNum, "month-day");
    let vendor_i = this.transactions.vendors[tNum];
    let amount_i = (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.formatDollar)(this.transactions.amts[tNum], 2);

    const currPageID = this.currPage.id;
    const pageTableBody = document.querySelector("#" + currPageID + " tbody");
    let newRowEl = document.createElement('tr');
      let newDataEl = document.createElement('td');
      
      let newImageEl = document.createElement('img');
        newImageEl.setAttribute('src', catImg_i);
        newDataEl.appendChild(newImageEl);
      newRowEl.appendChild(newDataEl);

      newDataEl = document.createElement('td');
      newDataEl.textContent = date_i;
      newRowEl.appendChild(newDataEl);

      newDataEl = document.createElement('td');
      newDataEl.textContent = vendor_i;
      newRowEl.appendChild(newDataEl);

      newDataEl = document.createElement('td');
      newDataEl.textContent = amount_i;
      newRowEl.appendChild(newDataEl);
    
    pageTableBody.appendChild(newRowEl);
  }

}

/***/ }),

/***/ "./src/modules/helper.js":
/*!*******************************!*\
  !*** ./src/modules/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatDollar": () => (/* binding */ formatDollar),
/* harmony export */   "getImg": () => (/* binding */ getImg)
/* harmony export */ });
function formatDollar(num, decimals) {
  // Convert num to float, just in case.
  num = parseFloat(num);
  
  let outputNum = "$";

  if (num >= 1000) {
    let thousands = Math.floor(num / 1000);
    outputNum += thousands.toString();
    outputNum += ",";
    num -= (thousands*1000);
  }

  // console.log(num, ", type: ", typeof num);
  outputNum += num.toFixed(decimals);
  return outputNum;
}

function getImg(cat) {
  let catToImg = {
    "Auto":"auto-gas.svg",
    "Fun":"fun.svg",
    "Groceries":"groceries.svg",
    "Delivery":"delivery.svg",
    "Home":"home.svg",
    "Home & Kingsley":"home.svg",
    "Alcohol":"home.svg",
    "Restaurants":"restaurants.svg",
    "Travel":"travel.svg",
    "Internet": "utilities.svg",
    "Electric & Water": "utilities.svg"
  };
  let imgFileStr = "./img/";
  imgFileStr += catToImg[cat];
  return imgFileStr;
}

/***/ }),

/***/ "./src/modules/transactions.js":
/*!*************************************!*\
  !*** ./src/modules/transactions.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transactions": () => (/* binding */ Transactions)
/* harmony export */ });
class Transactions {

  constructor (transHash) {
    this.dates = transHash["Date"];
    this.vendors = transHash["Vendor"];
    this.cats = transHash["Category"];
    this.amts = transHash["Amount"];
    this.numberOfTransactions = this.dates.length;

    this.getCatTotals();
    this.truncateTotals();
    this.getTopCatsArrays();

    this.monthYear = this.dateToString(0, "month-year");
    this.maxDate = this.dateToString(0, "day-month");
    this.minDate = this.dateToString(this.numberOfTransactions-1, "day-month");
  }

  getCatTotals () {
    this.catTotalsHash = {};
    this.totalSpend = 0;
    let cat_i;
    let amt_i;
    for (let i=0; i<this.dates.length; i++) {
      cat_i = this.cats[i];
      amt_i = this.amts[i];
      if (this.catTotalsHash[cat_i]) {
        this.catTotalsHash[cat_i] += amt_i;
      } else {
        this.catTotalsHash[cat_i] = amt_i;
      }
  
      this.totalSpend += amt_i;
    }

    this.emmaPortion = this.totalSpend / 2;
  }

  truncateTotals () {
    let total_i = 0;
    let cat_i = "";
    for (let i=0; i<(Object.keys(this.catTotalsHash).length); i++) {
      cat_i = Object.keys(this.catTotalsHash)[i];
      total_i = parseFloat(this.catTotalsHash[cat_i]).toFixed(2);
      this.catTotalsHash[cat_i] = total_i;
    }

    this.totalSpend = parseFloat(this.totalSpend.toFixed(2));
    this.emmaPortion = parseFloat(this.emmaPortion.toFixed(2));
  }

  getTopCatsArrays () {
    let catTotalsHashTemp = Object.assign({}, this.catTotalsHash);
    let numberOfTopCats = Math.min(3, Object.keys(this.catTotalsHash).length);

    this.topCats = [];
    this.topVals = [];
    let currMaxCat = "";
    for (let i=0; i < numberOfTopCats; i++) {
      currMaxCat = this.getMaxCat(catTotalsHashTemp);
      this.topCats.push(currMaxCat);
      this.topVals.push(catTotalsHashTemp[currMaxCat]);
      delete catTotalsHashTemp[currMaxCat];
    }
  }

  getMaxCat (catHash) {
    let cats = Object.keys(catHash);
    let vals = Object.values(catHash);

    let maxVal = 0;
    let maxCat = "";
    for (let i=0; i<cats.length; i++) {
      if (vals[i] > maxVal) {
        maxVal = vals[i];
        maxCat = cats[i];
      }
    }

    return maxCat;
  }

  dateToString (index, type) {
    // Valid types:
    //  "month-year"  -->   "Dec 2022"
    //  "day-month"   -->   "Fri, Dec 31"
    let options;
    if (type == "month-year") {
      options = {  "month": "short", "year": "numeric" };
    } else if (type == "day-month") {
      options = { 'weekday': "short", "month": "short", "day": "numeric" };
    } else if (type == "month-day") {
      options = { "month": "short", "day": "numeric" };
    }
    return new Date(this.dates[index]).toLocaleDateString("en-us", options);
  }
}

/***/ }),

/***/ "./json/2023.01.08_transactions.json":
/*!*******************************************!*\
  !*** ./json/2023.01.08_transactions.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"Date":["1/6/2023","1/3/2023","1/2/2023","1/1/2023","1/1/2023"],"Vendor":["Splash & Dash","GoPuff","Harris Teeter","Amazon","Uber Eats"],"Category":["Home & Kingsley","Delivery","Groceries","Home & Kingsley","Delivery"],"Amount":[101,53.33,93.44,13.89,56.35]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_transactions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/transactions.js */ "./src/modules/transactions.js");
/* harmony import */ var _modules_document_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/document-helper.js */ "./src/modules/document-helper.js");



// import { CSVDataFrame } from "./modules/csv-data-frame.js";
// const filename = "./../csv/2023.01.08_transactions.csv";
// const rawData = new CSVDataFrame(filename);
// const trans = rawData.asArrays;
const trans = __webpack_require__(/*! ./../json/2023.01.08_transactions.json */ "./json/2023.01.08_transactions.json");


let transObj = new _modules_transactions_js__WEBPACK_IMPORTED_MODULE_0__.Transactions(trans);
let docHelperObj = new _modules_document_helper_js__WEBPACK_IMPORTED_MODULE_1__.DocumentHelper(document, transObj);

docHelperObj.addHeaderDates();
docHelperObj.addTotalSpends();
docHelperObj.addAllTopCategories();
docHelperObj.createTransPages();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ055RDtBQUNLOztBQUU5RCxZQUFZLGVBQWU7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLG1GQUF3Qzs7O0FBRzlELG1CQUFtQixrRUFBWTtBQUMvQix1QkFBdUIsdUVBQWM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBLGdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvLi9zcmMvbW9kdWxlcy9kb2N1bWVudC1oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvLi9zcmMvbW9kdWxlcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvLi9zcmMvbW9kdWxlcy90cmFuc2FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWJ1ZGdldC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXREb2xsYXIsIGdldEltZyB9IGZyb20gXCIuL2hlbHBlci5qc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERvY3VtZW50SGVscGVyIHtcclxuXHJcbiAgY29uc3RydWN0b3IgKGRvY3VtZW50LCB0cmFuc2FjdGlvbnMpIHtcclxuICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcclxuICAgIHRoaXMudHJhbnNhY3Rpb25zID0gdHJhbnNhY3Rpb25zO1xyXG5cclxuICAgIHRoaXMuZ2V0S2V5RWxlbWVudHMoKTtcclxuICB9XHJcblxyXG4gIGdldEtleUVsZW1lbnRzICgpIHtcclxuICAgIHRoaXMuYm9keSA9ICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuXHJcbiAgICB0aGlzLmRpdlRvcENhdGVnb3JpZXMgPSAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3AtY2F0ZWdvcmllc1wiKTtcclxuICAgIHRoaXMuaGVhZGVySDEgPSAgICAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIGgxXCIpO1xyXG4gICAgdGhpcy5oZWFkZXJIMiA9ICAgICAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIgaDJcIik7XHJcbiAgICB0aGlzLnRvdGFsU3BlbmRFbCA9ICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b3RhbC1zcGVuZFwiKTtcclxuICAgIHRoaXMuZW1tYVBvcnRpb25FbCA9ICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtbWEtcG9ydGlvblwiKTtcclxuICB9XHJcblxyXG4gIGFkZEhlYWRlckRhdGVzICgpIHtcclxuICAgIC8vIGNvbnN0IGhlYWRlckgxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciBoMVwiKTtcclxuICAgIGxldCBuZXdIMVRleHQgPSB0aGlzLmhlYWRlckgxLnRleHRDb250ZW50O1xyXG4gICAgbmV3SDFUZXh0ICs9IHRoaXMudHJhbnNhY3Rpb25zLm1vbnRoWWVhcjtcclxuICAgIHRoaXMuaGVhZGVySDEudGV4dENvbnRlbnQgPSBuZXdIMVRleHQ7XHJcblxyXG4gICAgLy8gY29uc3QgaGVhZGVySDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIGgyXCIpO1xyXG4gICAgbGV0IG5ld0gyVGV4dCA9IHRoaXMudHJhbnNhY3Rpb25zLm1pbkRhdGUgKyBcIiAtIFwiICsgdGhpcy50cmFuc2FjdGlvbnMubWF4RGF0ZTtcclxuICAgIHRoaXMuaGVhZGVySDIudGV4dENvbnRlbnQgPSBuZXdIMlRleHQ7XHJcbiAgfVxyXG5cclxuICBhZGRUb3RhbFNwZW5kcyAoKSB7XHJcbiAgICB0aGlzLnRvdGFsU3BlbmRFbC50ZXh0Q29udGVudCA9IGZvcm1hdERvbGxhcih0aGlzLnRyYW5zYWN0aW9ucy50b3RhbFNwZW5kLCAwKTtcclxuICAgIHRoaXMuZW1tYVBvcnRpb25FbC50ZXh0Q29udGVudCA9IGZvcm1hdERvbGxhcih0aGlzLnRyYW5zYWN0aW9ucy5lbW1hUG9ydGlvbiwgMCk7XHJcbiAgfVxyXG5cclxuICBhZGRUb3BDYXRlZ29yeSAoY2F0LCB2YWwpIHtcclxuICAgIC8vIEFkZCBjYXRlZ29yeSBzdW1tYXJ5XHJcbiAgICBsZXQgbmV3Q2F0SXRlbSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG5ld0NhdEl0ZW0uY2xhc3NMaXN0LmFkZChcInRvcC1jYXQtaXRlbVwiKTtcclxuXHJcbiAgICAgIGxldCBuZXdJbWcgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgZ2V0SW1nKGNhdCkpO1xyXG4gICAgICBuZXdDYXRJdGVtLmFwcGVuZENoaWxkKG5ld0ltZyk7XHJcblxyXG4gICAgICBsZXQgbmV3Q2F0SW5mbyA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgbmV3Q2F0SW5mby5jbGFzc0xpc3QuYWRkKFwidG9wLWNhdC1pbmZvXCIpO1xyXG4gICAgICAgIGxldCBuZXdDYXRBbXQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcclxuICAgICAgICBuZXdDYXRBbXQudGV4dENvbnRlbnQgPSBmb3JtYXREb2xsYXIodmFsLCAwKTtcclxuICAgICAgICBuZXdDYXRJbmZvLmFwcGVuZENoaWxkKG5ld0NhdEFtdCk7XHJcblxyXG4gICAgICAgIGxldCBuZXdDYXRDYXQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNFwiKTtcclxuICAgICAgICBuZXdDYXRDYXQudGV4dENvbnRlbnQgPSBjYXQ7XHJcbiAgICAgICAgbmV3Q2F0SW5mby5hcHBlbmRDaGlsZChuZXdDYXRDYXQpO1xyXG4gICAgICBuZXdDYXRJdGVtLmFwcGVuZENoaWxkKG5ld0NhdEluZm8pO1xyXG5cclxuICAgIHRoaXMuZGl2VG9wQ2F0ZWdvcmllcy5hcHBlbmRDaGlsZChuZXdDYXRJdGVtKTtcclxuICB9XHJcblxyXG4gIGFkZEFsbFRvcENhdGVnb3JpZXMgKCkge1xyXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMudHJhbnNhY3Rpb25zLnRvcENhdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5hZGRUb3BDYXRlZ29yeSh0aGlzLnRyYW5zYWN0aW9ucy50b3BDYXRzW2ldLCB0aGlzLnRyYW5zYWN0aW9ucy50b3BWYWxzW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVRyYW5zUGFnZXMgKCkge1xyXG4gICAgLy8gdGhpcy50cmFuc1BhZ2VzQ291bnQgPSBNYXRoLmZsb29yKHRoaXMudHJhbnNhY3Rpb25zLm51bWJlck9mVHJhbnNhY3Rpb25zLzEwKSArIDE7XHJcblxyXG4gICAgbGV0IGN1cnJQYWdlO1xyXG4gICAgZm9yIChsZXQgdE51bT0wOyB0TnVtPHRoaXMudHJhbnNhY3Rpb25zLm51bWJlck9mVHJhbnNhY3Rpb25zOyB0TnVtKyspIHtcclxuICAgICAgaWYgKHROdW0lMTAgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuY3VyclBhZ2UgPSB0aGlzLmNyZWF0ZVBhZ2UodE51bS8xMCArIDIpO1xyXG4gICAgICAgIHRoaXMuYWRkVGl0bGUoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY3VyclBhZ2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFwcGVuZFJvdyh0TnVtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVBhZ2UocGFnZU51bSkge1xyXG4gICAgbGV0IG5ld1BhZ2UgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbmV3UGFnZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcGFnZS0ke3BhZ2VOdW19YCk7XHJcbiAgICBuZXdQYWdlLmNsYXNzTGlzdC5hZGQoXCJ0cmFuc2FjdGlvbnNcIik7XHJcbiAgICByZXR1cm4gbmV3UGFnZTtcclxuICB9XHJcblxyXG4gIGFkZFRpdGxlICgpIHtcclxuICAgIGxldCBuZXdIMSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcclxuICAgIGxldCBuZXdUaXRsZSA9ICh0aGlzLmN1cnJQYWdlLmlkID09IFwicGFnZS0yXCIgPyBcIlRyYW5zYWN0aW9uc1wiIDogXCJUcmFuc2FjdGlvbnMgKGNvbnQnZClcIik7XHJcbiAgICBuZXdIMS50ZXh0Q29udGVudCA9IG5ld1RpdGxlO1xyXG4gICAgdGhpcy5jdXJyUGFnZS5hcHBlbmRDaGlsZChuZXdIMSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUYWJsZSAoKSB7XHJcbiAgICBsZXQgY29sTmFtZXMgPSBbXCIgXCIsIFwiRGF0ZVwiLCBcIlZlbmRvclwiLCBcIkFtb3VudFwiXTtcclxuXHJcbiAgICBsZXQgbmV3VGFibGUgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XHJcbiAgICBsZXQgbmV3VEhlYWQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoZWFkJyk7XHJcbiAgICBsZXQgbmV3VFIgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcblxyXG4gICAgbGV0IG5ld1RIO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpPGNvbE5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG5ld1RIID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aCcpO1xyXG4gICAgICBuZXdUSC5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLCBcImNvbFwiKTtcclxuICAgICAgbmV3VEgudGV4dENvbnRlbnQgPSBjb2xOYW1lc1tpXTtcclxuICAgICAgbmV3VFIuYXBwZW5kQ2hpbGQobmV3VEgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1RIZWFkLmFwcGVuZENoaWxkKG5ld1RSKTtcclxuICAgIG5ld1RhYmxlLmFwcGVuZENoaWxkKG5ld1RIZWFkKTtcclxuICAgIG5ld1RhYmxlLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRib2R5XCIpKTtcclxuXHJcbiAgICB0aGlzLmN1cnJQYWdlLmFwcGVuZENoaWxkKG5ld1RhYmxlKTtcclxuICB9XHJcblxyXG4gIGFwcGVuZFJvdyAodE51bSkge1xyXG4gICAgLy8gcGFnZSwgY2F0LCBkYXRlLCB2ZW5kb3IsIGFtb3VudFxyXG4gICAgbGV0IHBhZ2VfaSA9IE1hdGguZmxvb3IodE51bS8xMCkgKyAyO1xyXG4gICAgbGV0IGNhdEltZ19pID0gZ2V0SW1nKHRoaXMudHJhbnNhY3Rpb25zLmNhdHNbdE51bV0pO1xyXG4gICAgbGV0IGRhdGVfaSA9IHRoaXMudHJhbnNhY3Rpb25zLmRhdGVUb1N0cmluZyh0TnVtLCBcIm1vbnRoLWRheVwiKTtcclxuICAgIGxldCB2ZW5kb3JfaSA9IHRoaXMudHJhbnNhY3Rpb25zLnZlbmRvcnNbdE51bV07XHJcbiAgICBsZXQgYW1vdW50X2kgPSBmb3JtYXREb2xsYXIodGhpcy50cmFuc2FjdGlvbnMuYW10c1t0TnVtXSwgMik7XHJcblxyXG4gICAgY29uc3QgY3VyclBhZ2VJRCA9IHRoaXMuY3VyclBhZ2UuaWQ7XHJcbiAgICBjb25zdCBwYWdlVGFibGVCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGN1cnJQYWdlSUQgKyBcIiB0Ym9keVwiKTtcclxuICAgIGxldCBuZXdSb3dFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XHJcbiAgICAgIGxldCBuZXdEYXRhRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICBcclxuICAgICAgbGV0IG5ld0ltYWdlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBuZXdJbWFnZUVsLnNldEF0dHJpYnV0ZSgnc3JjJywgY2F0SW1nX2kpO1xyXG4gICAgICAgIG5ld0RhdGFFbC5hcHBlbmRDaGlsZChuZXdJbWFnZUVsKTtcclxuICAgICAgbmV3Um93RWwuYXBwZW5kQ2hpbGQobmV3RGF0YUVsKTtcclxuXHJcbiAgICAgIG5ld0RhdGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgIG5ld0RhdGFFbC50ZXh0Q29udGVudCA9IGRhdGVfaTtcclxuICAgICAgbmV3Um93RWwuYXBwZW5kQ2hpbGQobmV3RGF0YUVsKTtcclxuXHJcbiAgICAgIG5ld0RhdGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgIG5ld0RhdGFFbC50ZXh0Q29udGVudCA9IHZlbmRvcl9pO1xyXG4gICAgICBuZXdSb3dFbC5hcHBlbmRDaGlsZChuZXdEYXRhRWwpO1xyXG5cclxuICAgICAgbmV3RGF0YUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgICAgbmV3RGF0YUVsLnRleHRDb250ZW50ID0gYW1vdW50X2k7XHJcbiAgICAgIG5ld1Jvd0VsLmFwcGVuZENoaWxkKG5ld0RhdGFFbCk7XHJcbiAgICBcclxuICAgIHBhZ2VUYWJsZUJvZHkuYXBwZW5kQ2hpbGQobmV3Um93RWwpO1xyXG4gIH1cclxuXHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gZm9ybWF0RG9sbGFyKG51bSwgZGVjaW1hbHMpIHtcclxuICAvLyBDb252ZXJ0IG51bSB0byBmbG9hdCwganVzdCBpbiBjYXNlLlxyXG4gIG51bSA9IHBhcnNlRmxvYXQobnVtKTtcclxuICBcclxuICBsZXQgb3V0cHV0TnVtID0gXCIkXCI7XHJcblxyXG4gIGlmIChudW0gPj0gMTAwMCkge1xyXG4gICAgbGV0IHRob3VzYW5kcyA9IE1hdGguZmxvb3IobnVtIC8gMTAwMCk7XHJcbiAgICBvdXRwdXROdW0gKz0gdGhvdXNhbmRzLnRvU3RyaW5nKCk7XHJcbiAgICBvdXRwdXROdW0gKz0gXCIsXCI7XHJcbiAgICBudW0gLT0gKHRob3VzYW5kcyoxMDAwKTtcclxuICB9XHJcblxyXG4gIC8vIGNvbnNvbGUubG9nKG51bSwgXCIsIHR5cGU6IFwiLCB0eXBlb2YgbnVtKTtcclxuICBvdXRwdXROdW0gKz0gbnVtLnRvRml4ZWQoZGVjaW1hbHMpO1xyXG4gIHJldHVybiBvdXRwdXROdW07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWcoY2F0KSB7XHJcbiAgbGV0IGNhdFRvSW1nID0ge1xyXG4gICAgXCJBdXRvXCI6XCJhdXRvLWdhcy5zdmdcIixcclxuICAgIFwiRnVuXCI6XCJmdW4uc3ZnXCIsXHJcbiAgICBcIkdyb2Nlcmllc1wiOlwiZ3JvY2VyaWVzLnN2Z1wiLFxyXG4gICAgXCJEZWxpdmVyeVwiOlwiZGVsaXZlcnkuc3ZnXCIsXHJcbiAgICBcIkhvbWVcIjpcImhvbWUuc3ZnXCIsXHJcbiAgICBcIkhvbWUgJiBLaW5nc2xleVwiOlwiaG9tZS5zdmdcIixcclxuICAgIFwiQWxjb2hvbFwiOlwiaG9tZS5zdmdcIixcclxuICAgIFwiUmVzdGF1cmFudHNcIjpcInJlc3RhdXJhbnRzLnN2Z1wiLFxyXG4gICAgXCJUcmF2ZWxcIjpcInRyYXZlbC5zdmdcIixcclxuICAgIFwiSW50ZXJuZXRcIjogXCJ1dGlsaXRpZXMuc3ZnXCIsXHJcbiAgICBcIkVsZWN0cmljICYgV2F0ZXJcIjogXCJ1dGlsaXRpZXMuc3ZnXCJcclxuICB9O1xyXG4gIGxldCBpbWdGaWxlU3RyID0gXCIuL2ltZy9cIjtcclxuICBpbWdGaWxlU3RyICs9IGNhdFRvSW1nW2NhdF07XHJcbiAgcmV0dXJuIGltZ0ZpbGVTdHI7XHJcbn0iLCJleHBvcnQgY2xhc3MgVHJhbnNhY3Rpb25zIHtcclxuXHJcbiAgY29uc3RydWN0b3IgKHRyYW5zSGFzaCkge1xyXG4gICAgdGhpcy5kYXRlcyA9IHRyYW5zSGFzaFtcIkRhdGVcIl07XHJcbiAgICB0aGlzLnZlbmRvcnMgPSB0cmFuc0hhc2hbXCJWZW5kb3JcIl07XHJcbiAgICB0aGlzLmNhdHMgPSB0cmFuc0hhc2hbXCJDYXRlZ29yeVwiXTtcclxuICAgIHRoaXMuYW10cyA9IHRyYW5zSGFzaFtcIkFtb3VudFwiXTtcclxuICAgIHRoaXMubnVtYmVyT2ZUcmFuc2FjdGlvbnMgPSB0aGlzLmRhdGVzLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmdldENhdFRvdGFscygpO1xyXG4gICAgdGhpcy50cnVuY2F0ZVRvdGFscygpO1xyXG4gICAgdGhpcy5nZXRUb3BDYXRzQXJyYXlzKCk7XHJcblxyXG4gICAgdGhpcy5tb250aFllYXIgPSB0aGlzLmRhdGVUb1N0cmluZygwLCBcIm1vbnRoLXllYXJcIik7XHJcbiAgICB0aGlzLm1heERhdGUgPSB0aGlzLmRhdGVUb1N0cmluZygwLCBcImRheS1tb250aFwiKTtcclxuICAgIHRoaXMubWluRGF0ZSA9IHRoaXMuZGF0ZVRvU3RyaW5nKHRoaXMubnVtYmVyT2ZUcmFuc2FjdGlvbnMtMSwgXCJkYXktbW9udGhcIik7XHJcbiAgfVxyXG5cclxuICBnZXRDYXRUb3RhbHMgKCkge1xyXG4gICAgdGhpcy5jYXRUb3RhbHNIYXNoID0ge307XHJcbiAgICB0aGlzLnRvdGFsU3BlbmQgPSAwO1xyXG4gICAgbGV0IGNhdF9pO1xyXG4gICAgbGV0IGFtdF9pO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpPHRoaXMuZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY2F0X2kgPSB0aGlzLmNhdHNbaV07XHJcbiAgICAgIGFtdF9pID0gdGhpcy5hbXRzW2ldO1xyXG4gICAgICBpZiAodGhpcy5jYXRUb3RhbHNIYXNoW2NhdF9pXSkge1xyXG4gICAgICAgIHRoaXMuY2F0VG90YWxzSGFzaFtjYXRfaV0gKz0gYW10X2k7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jYXRUb3RhbHNIYXNoW2NhdF9pXSA9IGFtdF9pO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHRoaXMudG90YWxTcGVuZCArPSBhbXRfaTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVtbWFQb3J0aW9uID0gdGhpcy50b3RhbFNwZW5kIC8gMjtcclxuICB9XHJcblxyXG4gIHRydW5jYXRlVG90YWxzICgpIHtcclxuICAgIGxldCB0b3RhbF9pID0gMDtcclxuICAgIGxldCBjYXRfaSA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8KE9iamVjdC5rZXlzKHRoaXMuY2F0VG90YWxzSGFzaCkubGVuZ3RoKTsgaSsrKSB7XHJcbiAgICAgIGNhdF9pID0gT2JqZWN0LmtleXModGhpcy5jYXRUb3RhbHNIYXNoKVtpXTtcclxuICAgICAgdG90YWxfaSA9IHBhcnNlRmxvYXQodGhpcy5jYXRUb3RhbHNIYXNoW2NhdF9pXSkudG9GaXhlZCgyKTtcclxuICAgICAgdGhpcy5jYXRUb3RhbHNIYXNoW2NhdF9pXSA9IHRvdGFsX2k7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b3RhbFNwZW5kID0gcGFyc2VGbG9hdCh0aGlzLnRvdGFsU3BlbmQudG9GaXhlZCgyKSk7XHJcbiAgICB0aGlzLmVtbWFQb3J0aW9uID0gcGFyc2VGbG9hdCh0aGlzLmVtbWFQb3J0aW9uLnRvRml4ZWQoMikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9wQ2F0c0FycmF5cyAoKSB7XHJcbiAgICBsZXQgY2F0VG90YWxzSGFzaFRlbXAgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNhdFRvdGFsc0hhc2gpO1xyXG4gICAgbGV0IG51bWJlck9mVG9wQ2F0cyA9IE1hdGgubWluKDMsIE9iamVjdC5rZXlzKHRoaXMuY2F0VG90YWxzSGFzaCkubGVuZ3RoKTtcclxuXHJcbiAgICB0aGlzLnRvcENhdHMgPSBbXTtcclxuICAgIHRoaXMudG9wVmFscyA9IFtdO1xyXG4gICAgbGV0IGN1cnJNYXhDYXQgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbnVtYmVyT2ZUb3BDYXRzOyBpKyspIHtcclxuICAgICAgY3Vyck1heENhdCA9IHRoaXMuZ2V0TWF4Q2F0KGNhdFRvdGFsc0hhc2hUZW1wKTtcclxuICAgICAgdGhpcy50b3BDYXRzLnB1c2goY3Vyck1heENhdCk7XHJcbiAgICAgIHRoaXMudG9wVmFscy5wdXNoKGNhdFRvdGFsc0hhc2hUZW1wW2N1cnJNYXhDYXRdKTtcclxuICAgICAgZGVsZXRlIGNhdFRvdGFsc0hhc2hUZW1wW2N1cnJNYXhDYXRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TWF4Q2F0IChjYXRIYXNoKSB7XHJcbiAgICBsZXQgY2F0cyA9IE9iamVjdC5rZXlzKGNhdEhhc2gpO1xyXG4gICAgbGV0IHZhbHMgPSBPYmplY3QudmFsdWVzKGNhdEhhc2gpO1xyXG5cclxuICAgIGxldCBtYXhWYWwgPSAwO1xyXG4gICAgbGV0IG1heENhdCA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8Y2F0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodmFsc1tpXSA+IG1heFZhbCkge1xyXG4gICAgICAgIG1heFZhbCA9IHZhbHNbaV07XHJcbiAgICAgICAgbWF4Q2F0ID0gY2F0c1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXhDYXQ7XHJcbiAgfVxyXG5cclxuICBkYXRlVG9TdHJpbmcgKGluZGV4LCB0eXBlKSB7XHJcbiAgICAvLyBWYWxpZCB0eXBlczpcclxuICAgIC8vICBcIm1vbnRoLXllYXJcIiAgLS0+ICAgXCJEZWMgMjAyMlwiXHJcbiAgICAvLyAgXCJkYXktbW9udGhcIiAgIC0tPiAgIFwiRnJpLCBEZWMgMzFcIlxyXG4gICAgbGV0IG9wdGlvbnM7XHJcbiAgICBpZiAodHlwZSA9PSBcIm1vbnRoLXllYXJcIikge1xyXG4gICAgICBvcHRpb25zID0geyAgXCJtb250aFwiOiBcInNob3J0XCIsIFwieWVhclwiOiBcIm51bWVyaWNcIiB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwiZGF5LW1vbnRoXCIpIHtcclxuICAgICAgb3B0aW9ucyA9IHsgJ3dlZWtkYXknOiBcInNob3J0XCIsIFwibW9udGhcIjogXCJzaG9ydFwiLCBcImRheVwiOiBcIm51bWVyaWNcIiB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwibW9udGgtZGF5XCIpIHtcclxuICAgICAgb3B0aW9ucyA9IHsgXCJtb250aFwiOiBcInNob3J0XCIsIFwiZGF5XCI6IFwibnVtZXJpY1wiIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy5kYXRlc1tpbmRleF0pLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLXVzXCIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVHJhbnNhY3Rpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy90cmFuc2FjdGlvbnMuanNcIjtcbmltcG9ydCB7IERvY3VtZW50SGVscGVyIH0gZnJvbSBcIi4vbW9kdWxlcy9kb2N1bWVudC1oZWxwZXIuanNcIjtcblxuLy8gaW1wb3J0IHsgQ1NWRGF0YUZyYW1lIH0gZnJvbSBcIi4vbW9kdWxlcy9jc3YtZGF0YS1mcmFtZS5qc1wiO1xuLy8gY29uc3QgZmlsZW5hbWUgPSBcIi4vLi4vY3N2LzIwMjMuMDEuMDhfdHJhbnNhY3Rpb25zLmNzdlwiO1xuLy8gY29uc3QgcmF3RGF0YSA9IG5ldyBDU1ZEYXRhRnJhbWUoZmlsZW5hbWUpO1xuLy8gY29uc3QgdHJhbnMgPSByYXdEYXRhLmFzQXJyYXlzO1xuY29uc3QgdHJhbnMgPSByZXF1aXJlKCcuLy4uL2pzb24vMjAyMy4wMS4wOF90cmFuc2FjdGlvbnMuanNvbicpO1xuXG5cbmxldCB0cmFuc09iaiA9IG5ldyBUcmFuc2FjdGlvbnModHJhbnMpO1xubGV0IGRvY0hlbHBlck9iaiA9IG5ldyBEb2N1bWVudEhlbHBlcihkb2N1bWVudCwgdHJhbnNPYmopO1xuXG5kb2NIZWxwZXJPYmouYWRkSGVhZGVyRGF0ZXMoKTtcbmRvY0hlbHBlck9iai5hZGRUb3RhbFNwZW5kcygpO1xuZG9jSGVscGVyT2JqLmFkZEFsbFRvcENhdGVnb3JpZXMoKTtcbmRvY0hlbHBlck9iai5jcmVhdGVUcmFuc1BhZ2VzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9