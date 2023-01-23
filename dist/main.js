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
        this.catTotalsHash[cat_i] += parseFloat(amt_i);
      } else {
        this.catTotalsHash[cat_i] = parseFloat(amt_i);
      }
  
      this.totalSpend += parseFloat(amt_i);
    }

    this.emmaPortion = this.totalSpend / 2;
  }

  truncateTotals () {
    let total_i = 0;
    let cat_i = "";
    for (let i=0; i<(Object.keys(this.catTotalsHash).length); i++) {
      cat_i = Object.keys(this.catTotalsHash)[i];
      total_i = parseFloat(this.catTotalsHash[cat_i]).toFixed(2);
      console.log(typeof this.catTotalsHash[cat_i]);
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
      if (parseFloat(vals[i]) > maxVal) {
        maxVal = parseFloat(vals[i]);
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

/***/ "./json/2023.01.20_transactions.json":
/*!*******************************************!*\
  !*** ./json/2023.01.20_transactions.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"Date":["1/16/2023","1/18/2023","1/18/2023","1/16/2023","1/16/2023","1/15/2023","1/15/2023","1/15/2023","1/15/2023","1/15/2023","1/13/2023","1/13/2023","1/11/2023","1/11/2023","1/10/2023","1/8/2023","1/7/2023","1/7/2023","1/7/2023"],"Vendor":["Harris Teeter","Food Lion","HelloFresh","DoorDash","Harris Teeter","Southern Craft Butcher","Heyday Brewing","Heyday Brewing","Heyday Brewing","Heyday Brewing","Amazon","Tupelo Honey Cafe","HelloFresh","HelloFresh","Uber Eats","Amazon","Amazon","Harris Teeter","Trader Joe\'s"],"Category":["Groceries","Groceries","Groceries","Delivery","Groceries","Restaurants","Restaurants","Restaurants","Restaurants","Restaurants","Home & Kingsley","Restaurants","Groceries","Groceries","Delivery","Home & Kingsley","Home & Kingsley","Groceries","Groceries"],"Amount":["122.29","78.4","71.13","45.56","63.75","39.59","10.66","10.66","18.24","78.24","31.1","53.63","9.14","83.35","27.26","22.48","11.79","118.23","80.18"]}');

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



const trans = __webpack_require__(/*! ./../json/2023.01.20_transactions.json */ "./json/2023.01.20_transactions.json");


let transObj = new _modules_transactions_js__WEBPACK_IMPORTED_MODULE_0__.Transactions(trans);
let docHelperObj = new _modules_document_helper_js__WEBPACK_IMPORTED_MODULE_1__.DocumentHelper(document, transObj);

docHelperObj.addHeaderDates();
docHelperObj.addTotalSpends();
docHelperObj.addAllTopCategories();
docHelperObj.createTransPages();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnlEO0FBQ0s7O0FBRTlELGNBQWMsbUJBQU8sQ0FBQyxtRkFBd0M7OztBQUc5RCxtQkFBbUIsa0VBQVk7QUFDL0IsdUJBQXVCLHVFQUFjOztBQUVyQztBQUNBO0FBQ0E7QUFDQSxnQyIsInNvdXJjZXMiOlsid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0Ly4vc3JjL21vZHVsZXMvZG9jdW1lbnQtaGVscGVyLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0Ly4vc3JjL21vZHVsZXMvaGVscGVyLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0Ly4vc3JjL21vZHVsZXMvdHJhbnNhY3Rpb25zLmpzIiwid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9qYXZhc2NyaXB0LWJ1ZGdldC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2phdmFzY3JpcHQtYnVkZ2V0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vamF2YXNjcmlwdC1idWRnZXQvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZm9ybWF0RG9sbGFyLCBnZXRJbWcgfSBmcm9tIFwiLi9oZWxwZXIuanNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBEb2N1bWVudEhlbHBlciB7XHJcblxyXG4gIGNvbnN0cnVjdG9yIChkb2N1bWVudCwgdHJhbnNhY3Rpb25zKSB7XHJcbiAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICB0aGlzLnRyYW5zYWN0aW9ucyA9IHRyYW5zYWN0aW9ucztcclxuXHJcbiAgICB0aGlzLmdldEtleUVsZW1lbnRzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRLZXlFbGVtZW50cyAoKSB7XHJcbiAgICB0aGlzLmJvZHkgPSAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcblxyXG4gICAgdGhpcy5kaXZUb3BDYXRlZ29yaWVzID0gICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9wLWNhdGVnb3JpZXNcIik7XHJcbiAgICB0aGlzLmhlYWRlckgxID0gICAgICAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciBoMVwiKTtcclxuICAgIHRoaXMuaGVhZGVySDIgPSAgICAgICAgICAgdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaGVhZGVyIGgyXCIpO1xyXG4gICAgdGhpcy50b3RhbFNwZW5kRWwgPSAgICAgICB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG90YWwtc3BlbmRcIik7XHJcbiAgICB0aGlzLmVtbWFQb3J0aW9uRWwgPSAgICAgIHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbW1hLXBvcnRpb25cIik7XHJcbiAgfVxyXG5cclxuICBhZGRIZWFkZXJEYXRlcyAoKSB7XHJcbiAgICAvLyBjb25zdCBoZWFkZXJIMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoZWFkZXIgaDFcIik7XHJcbiAgICBsZXQgbmV3SDFUZXh0ID0gdGhpcy5oZWFkZXJIMS50ZXh0Q29udGVudDtcclxuICAgIG5ld0gxVGV4dCArPSB0aGlzLnRyYW5zYWN0aW9ucy5tb250aFllYXI7XHJcbiAgICB0aGlzLmhlYWRlckgxLnRleHRDb250ZW50ID0gbmV3SDFUZXh0O1xyXG5cclxuICAgIC8vIGNvbnN0IGhlYWRlckgyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImhlYWRlciBoMlwiKTtcclxuICAgIGxldCBuZXdIMlRleHQgPSB0aGlzLnRyYW5zYWN0aW9ucy5taW5EYXRlICsgXCIgLSBcIiArIHRoaXMudHJhbnNhY3Rpb25zLm1heERhdGU7XHJcbiAgICB0aGlzLmhlYWRlckgyLnRleHRDb250ZW50ID0gbmV3SDJUZXh0O1xyXG4gIH1cclxuXHJcbiAgYWRkVG90YWxTcGVuZHMgKCkge1xyXG4gICAgdGhpcy50b3RhbFNwZW5kRWwudGV4dENvbnRlbnQgPSBmb3JtYXREb2xsYXIodGhpcy50cmFuc2FjdGlvbnMudG90YWxTcGVuZCwgMCk7XHJcbiAgICB0aGlzLmVtbWFQb3J0aW9uRWwudGV4dENvbnRlbnQgPSBmb3JtYXREb2xsYXIodGhpcy50cmFuc2FjdGlvbnMuZW1tYVBvcnRpb24sIDApO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9wQ2F0ZWdvcnkgKGNhdCwgdmFsKSB7XHJcbiAgICAvLyBBZGQgY2F0ZWdvcnkgc3VtbWFyeVxyXG4gICAgbGV0IG5ld0NhdEl0ZW0gPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBuZXdDYXRJdGVtLmNsYXNzTGlzdC5hZGQoXCJ0b3AtY2F0LWl0ZW1cIik7XHJcblxyXG4gICAgICBsZXQgbmV3SW1nID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGdldEltZyhjYXQpKTtcclxuICAgICAgbmV3Q2F0SXRlbS5hcHBlbmRDaGlsZChuZXdJbWcpO1xyXG5cclxuICAgICAgbGV0IG5ld0NhdEluZm8gPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIG5ld0NhdEluZm8uY2xhc3NMaXN0LmFkZChcInRvcC1jYXQtaW5mb1wiKTtcclxuICAgICAgICBsZXQgbmV3Q2F0QW10ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XHJcbiAgICAgICAgbmV3Q2F0QW10LnRleHRDb250ZW50ID0gZm9ybWF0RG9sbGFyKHZhbCwgMCk7XHJcbiAgICAgICAgbmV3Q2F0SW5mby5hcHBlbmRDaGlsZChuZXdDYXRBbXQpO1xyXG5cclxuICAgICAgICBsZXQgbmV3Q2F0Q2F0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDRcIik7XHJcbiAgICAgICAgbmV3Q2F0Q2F0LnRleHRDb250ZW50ID0gY2F0O1xyXG4gICAgICAgIG5ld0NhdEluZm8uYXBwZW5kQ2hpbGQobmV3Q2F0Q2F0KTtcclxuICAgICAgbmV3Q2F0SXRlbS5hcHBlbmRDaGlsZChuZXdDYXRJbmZvKTtcclxuXHJcbiAgICB0aGlzLmRpdlRvcENhdGVnb3JpZXMuYXBwZW5kQ2hpbGQobmV3Q2F0SXRlbSk7XHJcbiAgfVxyXG5cclxuICBhZGRBbGxUb3BDYXRlZ29yaWVzICgpIHtcclxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLnRyYW5zYWN0aW9ucy50b3BDYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuYWRkVG9wQ2F0ZWdvcnkodGhpcy50cmFuc2FjdGlvbnMudG9wQ2F0c1tpXSwgdGhpcy50cmFuc2FjdGlvbnMudG9wVmFsc1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVUcmFuc1BhZ2VzICgpIHtcclxuICAgIC8vIHRoaXMudHJhbnNQYWdlc0NvdW50ID0gTWF0aC5mbG9vcih0aGlzLnRyYW5zYWN0aW9ucy5udW1iZXJPZlRyYW5zYWN0aW9ucy8xMCkgKyAxO1xyXG5cclxuICAgIGxldCBjdXJyUGFnZTtcclxuICAgIGZvciAobGV0IHROdW09MDsgdE51bTx0aGlzLnRyYW5zYWN0aW9ucy5udW1iZXJPZlRyYW5zYWN0aW9uczsgdE51bSsrKSB7XHJcbiAgICAgIGlmICh0TnVtJTEwID09IDApIHtcclxuICAgICAgICB0aGlzLmN1cnJQYWdlID0gdGhpcy5jcmVhdGVQYWdlKHROdW0vMTAgKyAyKTtcclxuICAgICAgICB0aGlzLmFkZFRpdGxlKCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVUYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmN1cnJQYWdlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5hcHBlbmRSb3codE51bSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQYWdlKHBhZ2VOdW0pIHtcclxuICAgIGxldCBuZXdQYWdlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG5ld1BhZ2Uuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHBhZ2UtJHtwYWdlTnVtfWApO1xyXG4gICAgbmV3UGFnZS5jbGFzc0xpc3QuYWRkKFwidHJhbnNhY3Rpb25zXCIpO1xyXG4gICAgcmV0dXJuIG5ld1BhZ2U7XHJcbiAgfVxyXG5cclxuICBhZGRUaXRsZSAoKSB7XHJcbiAgICBsZXQgbmV3SDEgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbiAgICBsZXQgbmV3VGl0bGUgPSAodGhpcy5jdXJyUGFnZS5pZCA9PSBcInBhZ2UtMlwiID8gXCJUcmFuc2FjdGlvbnNcIiA6IFwiVHJhbnNhY3Rpb25zIChjb250J2QpXCIpO1xyXG4gICAgbmV3SDEudGV4dENvbnRlbnQgPSBuZXdUaXRsZTtcclxuICAgIHRoaXMuY3VyclBhZ2UuYXBwZW5kQ2hpbGQobmV3SDEpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGFibGUgKCkge1xyXG4gICAgbGV0IGNvbE5hbWVzID0gW1wiIFwiLCBcIkRhdGVcIiwgXCJWZW5kb3JcIiwgXCJBbW91bnRcIl07XHJcblxyXG4gICAgbGV0IG5ld1RhYmxlID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xyXG4gICAgbGV0IG5ld1RIZWFkID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0aGVhZCcpO1xyXG4gICAgbGV0IG5ld1RSID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG5cclxuICAgIGxldCBuZXdUSDtcclxuICAgIGZvciAobGV0IGk9MDsgaTxjb2xOYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBuZXdUSCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGgnKTtcclxuICAgICAgbmV3VEguc2V0QXR0cmlidXRlKFwic2NvcGVcIiwgXCJjb2xcIik7XHJcbiAgICAgIG5ld1RILnRleHRDb250ZW50ID0gY29sTmFtZXNbaV07XHJcbiAgICAgIG5ld1RSLmFwcGVuZENoaWxkKG5ld1RIKTtcclxuICAgIH1cclxuXHJcbiAgICBuZXdUSGVhZC5hcHBlbmRDaGlsZChuZXdUUik7XHJcbiAgICBuZXdUYWJsZS5hcHBlbmRDaGlsZChuZXdUSGVhZCk7XHJcbiAgICBuZXdUYWJsZS5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKSk7XHJcblxyXG4gICAgdGhpcy5jdXJyUGFnZS5hcHBlbmRDaGlsZChuZXdUYWJsZSk7XHJcbiAgfVxyXG5cclxuICBhcHBlbmRSb3cgKHROdW0pIHtcclxuICAgIC8vIHBhZ2UsIGNhdCwgZGF0ZSwgdmVuZG9yLCBhbW91bnRcclxuICAgIGxldCBwYWdlX2kgPSBNYXRoLmZsb29yKHROdW0vMTApICsgMjtcclxuICAgIGxldCBjYXRJbWdfaSA9IGdldEltZyh0aGlzLnRyYW5zYWN0aW9ucy5jYXRzW3ROdW1dKTtcclxuICAgIGxldCBkYXRlX2kgPSB0aGlzLnRyYW5zYWN0aW9ucy5kYXRlVG9TdHJpbmcodE51bSwgXCJtb250aC1kYXlcIik7XHJcbiAgICBsZXQgdmVuZG9yX2kgPSB0aGlzLnRyYW5zYWN0aW9ucy52ZW5kb3JzW3ROdW1dO1xyXG4gICAgbGV0IGFtb3VudF9pID0gZm9ybWF0RG9sbGFyKHRoaXMudHJhbnNhY3Rpb25zLmFtdHNbdE51bV0sIDIpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJQYWdlSUQgPSB0aGlzLmN1cnJQYWdlLmlkO1xyXG4gICAgY29uc3QgcGFnZVRhYmxlQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBjdXJyUGFnZUlEICsgXCIgdGJvZHlcIik7XHJcbiAgICBsZXQgbmV3Um93RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xyXG4gICAgICBsZXQgbmV3RGF0YUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgICAgXHJcbiAgICAgIGxldCBuZXdJbWFnZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgbmV3SW1hZ2VFbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGNhdEltZ19pKTtcclxuICAgICAgICBuZXdEYXRhRWwuYXBwZW5kQ2hpbGQobmV3SW1hZ2VFbCk7XHJcbiAgICAgIG5ld1Jvd0VsLmFwcGVuZENoaWxkKG5ld0RhdGFFbCk7XHJcblxyXG4gICAgICBuZXdEYXRhRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICBuZXdEYXRhRWwudGV4dENvbnRlbnQgPSBkYXRlX2k7XHJcbiAgICAgIG5ld1Jvd0VsLmFwcGVuZENoaWxkKG5ld0RhdGFFbCk7XHJcblxyXG4gICAgICBuZXdEYXRhRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICBuZXdEYXRhRWwudGV4dENvbnRlbnQgPSB2ZW5kb3JfaTtcclxuICAgICAgbmV3Um93RWwuYXBwZW5kQ2hpbGQobmV3RGF0YUVsKTtcclxuXHJcbiAgICAgIG5ld0RhdGFFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XHJcbiAgICAgIG5ld0RhdGFFbC50ZXh0Q29udGVudCA9IGFtb3VudF9pO1xyXG4gICAgICBuZXdSb3dFbC5hcHBlbmRDaGlsZChuZXdEYXRhRWwpO1xyXG4gICAgXHJcbiAgICBwYWdlVGFibGVCb2R5LmFwcGVuZENoaWxkKG5ld1Jvd0VsKTtcclxuICB9XHJcblxyXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdERvbGxhcihudW0sIGRlY2ltYWxzKSB7XHJcbiAgLy8gQ29udmVydCBudW0gdG8gZmxvYXQsIGp1c3QgaW4gY2FzZS5cclxuICBudW0gPSBwYXJzZUZsb2F0KG51bSk7XHJcbiAgXHJcbiAgbGV0IG91dHB1dE51bSA9IFwiJFwiO1xyXG5cclxuICBpZiAobnVtID49IDEwMDApIHtcclxuICAgIGxldCB0aG91c2FuZHMgPSBNYXRoLmZsb29yKG51bSAvIDEwMDApO1xyXG4gICAgb3V0cHV0TnVtICs9IHRob3VzYW5kcy50b1N0cmluZygpO1xyXG4gICAgb3V0cHV0TnVtICs9IFwiLFwiO1xyXG4gICAgbnVtIC09ICh0aG91c2FuZHMqMTAwMCk7XHJcbiAgfVxyXG5cclxuICAvLyBjb25zb2xlLmxvZyhudW0sIFwiLCB0eXBlOiBcIiwgdHlwZW9mIG51bSk7XHJcbiAgb3V0cHV0TnVtICs9IG51bS50b0ZpeGVkKGRlY2ltYWxzKTtcclxuICByZXR1cm4gb3V0cHV0TnVtO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1nKGNhdCkge1xyXG4gIGxldCBjYXRUb0ltZyA9IHtcclxuICAgIFwiQXV0b1wiOlwiYXV0by1nYXMuc3ZnXCIsXHJcbiAgICBcIkZ1blwiOlwiZnVuLnN2Z1wiLFxyXG4gICAgXCJHcm9jZXJpZXNcIjpcImdyb2Nlcmllcy5zdmdcIixcclxuICAgIFwiRGVsaXZlcnlcIjpcImRlbGl2ZXJ5LnN2Z1wiLFxyXG4gICAgXCJIb21lXCI6XCJob21lLnN2Z1wiLFxyXG4gICAgXCJIb21lICYgS2luZ3NsZXlcIjpcImhvbWUuc3ZnXCIsXHJcbiAgICBcIkFsY29ob2xcIjpcImhvbWUuc3ZnXCIsXHJcbiAgICBcIlJlc3RhdXJhbnRzXCI6XCJyZXN0YXVyYW50cy5zdmdcIixcclxuICAgIFwiVHJhdmVsXCI6XCJ0cmF2ZWwuc3ZnXCIsXHJcbiAgICBcIkludGVybmV0XCI6IFwidXRpbGl0aWVzLnN2Z1wiLFxyXG4gICAgXCJFbGVjdHJpYyAmIFdhdGVyXCI6IFwidXRpbGl0aWVzLnN2Z1wiXHJcbiAgfTtcclxuICBsZXQgaW1nRmlsZVN0ciA9IFwiLi9pbWcvXCI7XHJcbiAgaW1nRmlsZVN0ciArPSBjYXRUb0ltZ1tjYXRdO1xyXG4gIHJldHVybiBpbWdGaWxlU3RyO1xyXG59IiwiZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9ucyB7XHJcblxyXG4gIGNvbnN0cnVjdG9yICh0cmFuc0hhc2gpIHtcclxuICAgIHRoaXMuZGF0ZXMgPSB0cmFuc0hhc2hbXCJEYXRlXCJdO1xyXG4gICAgdGhpcy52ZW5kb3JzID0gdHJhbnNIYXNoW1wiVmVuZG9yXCJdO1xyXG4gICAgdGhpcy5jYXRzID0gdHJhbnNIYXNoW1wiQ2F0ZWdvcnlcIl07XHJcbiAgICB0aGlzLmFtdHMgPSB0cmFuc0hhc2hbXCJBbW91bnRcIl07XHJcbiAgICB0aGlzLm51bWJlck9mVHJhbnNhY3Rpb25zID0gdGhpcy5kYXRlcy5sZW5ndGg7XHJcblxyXG4gICAgdGhpcy5nZXRDYXRUb3RhbHMoKTtcclxuICAgIHRoaXMudHJ1bmNhdGVUb3RhbHMoKTtcclxuICAgIHRoaXMuZ2V0VG9wQ2F0c0FycmF5cygpO1xyXG5cclxuICAgIHRoaXMubW9udGhZZWFyID0gdGhpcy5kYXRlVG9TdHJpbmcoMCwgXCJtb250aC15ZWFyXCIpO1xyXG4gICAgdGhpcy5tYXhEYXRlID0gdGhpcy5kYXRlVG9TdHJpbmcoMCwgXCJkYXktbW9udGhcIik7XHJcbiAgICB0aGlzLm1pbkRhdGUgPSB0aGlzLmRhdGVUb1N0cmluZyh0aGlzLm51bWJlck9mVHJhbnNhY3Rpb25zLTEsIFwiZGF5LW1vbnRoXCIpO1xyXG4gIH1cclxuXHJcbiAgZ2V0Q2F0VG90YWxzICgpIHtcclxuICAgIHRoaXMuY2F0VG90YWxzSGFzaCA9IHt9O1xyXG4gICAgdGhpcy50b3RhbFNwZW5kID0gMDtcclxuICAgIGxldCBjYXRfaTtcclxuICAgIGxldCBhbXRfaTtcclxuICAgIGZvciAobGV0IGk9MDsgaTx0aGlzLmRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNhdF9pID0gdGhpcy5jYXRzW2ldO1xyXG4gICAgICBhbXRfaSA9IHRoaXMuYW10c1tpXTtcclxuICAgICAgaWYgKHRoaXMuY2F0VG90YWxzSGFzaFtjYXRfaV0pIHtcclxuICAgICAgICB0aGlzLmNhdFRvdGFsc0hhc2hbY2F0X2ldICs9IHBhcnNlRmxvYXQoYW10X2kpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2F0VG90YWxzSGFzaFtjYXRfaV0gPSBwYXJzZUZsb2F0KGFtdF9pKTtcclxuICAgICAgfVxyXG4gIFxyXG4gICAgICB0aGlzLnRvdGFsU3BlbmQgKz0gcGFyc2VGbG9hdChhbXRfaSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbW1hUG9ydGlvbiA9IHRoaXMudG90YWxTcGVuZCAvIDI7XHJcbiAgfVxyXG5cclxuICB0cnVuY2F0ZVRvdGFscyAoKSB7XHJcbiAgICBsZXQgdG90YWxfaSA9IDA7XHJcbiAgICBsZXQgY2F0X2kgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpPChPYmplY3Qua2V5cyh0aGlzLmNhdFRvdGFsc0hhc2gpLmxlbmd0aCk7IGkrKykge1xyXG4gICAgICBjYXRfaSA9IE9iamVjdC5rZXlzKHRoaXMuY2F0VG90YWxzSGFzaClbaV07XHJcbiAgICAgIHRvdGFsX2kgPSBwYXJzZUZsb2F0KHRoaXMuY2F0VG90YWxzSGFzaFtjYXRfaV0pLnRvRml4ZWQoMik7XHJcbiAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0aGlzLmNhdFRvdGFsc0hhc2hbY2F0X2ldKTtcclxuICAgICAgdGhpcy5jYXRUb3RhbHNIYXNoW2NhdF9pXSA9IHRvdGFsX2k7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b3RhbFNwZW5kID0gcGFyc2VGbG9hdCh0aGlzLnRvdGFsU3BlbmQudG9GaXhlZCgyKSk7XHJcbiAgICB0aGlzLmVtbWFQb3J0aW9uID0gcGFyc2VGbG9hdCh0aGlzLmVtbWFQb3J0aW9uLnRvRml4ZWQoMikpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VG9wQ2F0c0FycmF5cyAoKSB7XHJcbiAgICBsZXQgY2F0VG90YWxzSGFzaFRlbXAgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNhdFRvdGFsc0hhc2gpO1xyXG4gICAgbGV0IG51bWJlck9mVG9wQ2F0cyA9IE1hdGgubWluKDMsIE9iamVjdC5rZXlzKHRoaXMuY2F0VG90YWxzSGFzaCkubGVuZ3RoKTtcclxuXHJcbiAgICB0aGlzLnRvcENhdHMgPSBbXTtcclxuICAgIHRoaXMudG9wVmFscyA9IFtdO1xyXG4gICAgbGV0IGN1cnJNYXhDYXQgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbnVtYmVyT2ZUb3BDYXRzOyBpKyspIHtcclxuICAgICAgY3Vyck1heENhdCA9IHRoaXMuZ2V0TWF4Q2F0KGNhdFRvdGFsc0hhc2hUZW1wKTtcclxuICAgICAgdGhpcy50b3BDYXRzLnB1c2goY3Vyck1heENhdCk7XHJcbiAgICAgIHRoaXMudG9wVmFscy5wdXNoKGNhdFRvdGFsc0hhc2hUZW1wW2N1cnJNYXhDYXRdKTtcclxuICAgICAgZGVsZXRlIGNhdFRvdGFsc0hhc2hUZW1wW2N1cnJNYXhDYXRdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0TWF4Q2F0IChjYXRIYXNoKSB7XHJcbiAgICBsZXQgY2F0cyA9IE9iamVjdC5rZXlzKGNhdEhhc2gpO1xyXG4gICAgbGV0IHZhbHMgPSBPYmplY3QudmFsdWVzKGNhdEhhc2gpO1xyXG5cclxuICAgIGxldCBtYXhWYWwgPSAwO1xyXG4gICAgbGV0IG1heENhdCA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBpPTA7IGk8Y2F0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocGFyc2VGbG9hdCh2YWxzW2ldKSA+IG1heFZhbCkge1xyXG4gICAgICAgIG1heFZhbCA9IHBhcnNlRmxvYXQodmFsc1tpXSk7XHJcbiAgICAgICAgbWF4Q2F0ID0gY2F0c1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtYXhDYXQ7XHJcbiAgfVxyXG5cclxuICBkYXRlVG9TdHJpbmcgKGluZGV4LCB0eXBlKSB7XHJcbiAgICAvLyBWYWxpZCB0eXBlczpcclxuICAgIC8vICBcIm1vbnRoLXllYXJcIiAgLS0+ICAgXCJEZWMgMjAyMlwiXHJcbiAgICAvLyAgXCJkYXktbW9udGhcIiAgIC0tPiAgIFwiRnJpLCBEZWMgMzFcIlxyXG4gICAgbGV0IG9wdGlvbnM7XHJcbiAgICBpZiAodHlwZSA9PSBcIm1vbnRoLXllYXJcIikge1xyXG4gICAgICBvcHRpb25zID0geyAgXCJtb250aFwiOiBcInNob3J0XCIsIFwieWVhclwiOiBcIm51bWVyaWNcIiB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwiZGF5LW1vbnRoXCIpIHtcclxuICAgICAgb3B0aW9ucyA9IHsgJ3dlZWtkYXknOiBcInNob3J0XCIsIFwibW9udGhcIjogXCJzaG9ydFwiLCBcImRheVwiOiBcIm51bWVyaWNcIiB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09IFwibW9udGgtZGF5XCIpIHtcclxuICAgICAgb3B0aW9ucyA9IHsgXCJtb250aFwiOiBcInNob3J0XCIsIFwiZGF5XCI6IFwibnVtZXJpY1wiIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy5kYXRlc1tpbmRleF0pLnRvTG9jYWxlRGF0ZVN0cmluZyhcImVuLXVzXCIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgVHJhbnNhY3Rpb25zIH0gZnJvbSBcIi4vbW9kdWxlcy90cmFuc2FjdGlvbnMuanNcIjtcbmltcG9ydCB7IERvY3VtZW50SGVscGVyIH0gZnJvbSBcIi4vbW9kdWxlcy9kb2N1bWVudC1oZWxwZXIuanNcIjtcblxuY29uc3QgdHJhbnMgPSByZXF1aXJlKCcuLy4uL2pzb24vMjAyMy4wMS4yMF90cmFuc2FjdGlvbnMuanNvbicpO1xuXG5cbmxldCB0cmFuc09iaiA9IG5ldyBUcmFuc2FjdGlvbnModHJhbnMpO1xubGV0IGRvY0hlbHBlck9iaiA9IG5ldyBEb2N1bWVudEhlbHBlcihkb2N1bWVudCwgdHJhbnNPYmopO1xuXG5kb2NIZWxwZXJPYmouYWRkSGVhZGVyRGF0ZXMoKTtcbmRvY0hlbHBlck9iai5hZGRUb3RhbFNwZW5kcygpO1xuZG9jSGVscGVyT2JqLmFkZEFsbFRvcENhdGVnb3JpZXMoKTtcbmRvY0hlbHBlck9iai5jcmVhdGVUcmFuc1BhZ2VzKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9