import { formatDollar, getImg } from "./helper.js";

export class DocumentHelper {

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
    this.totalSpendEl.textContent = formatDollar(this.transactions.totalSpend, 0);
    this.emmaPortionEl.textContent = formatDollar(this.transactions.emmaPortion, 0);
  }

  addTopCategory (cat, val) {
    // Add category summary
    let newCatItem = this.document.createElement("div");
    newCatItem.classList.add("top-cat-item");

      let newImg = this.document.createElement("img");
      newImg.setAttribute("src", getImg(cat));
      newCatItem.appendChild(newImg);

      let newCatInfo = this.document.createElement("div");
      newCatInfo.classList.add("top-cat-info");
        let newCatAmt = this.document.createElement("h3");
        newCatAmt.textContent = formatDollar(val, 0);
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
    let catImg_i = getImg(this.transactions.cats[tNum]);
    let date_i = this.transactions.dateToString(tNum, "month-day");
    let vendor_i = this.transactions.vendors[tNum];
    let amount_i = formatDollar(this.transactions.amts[tNum], 2);

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