export class Transactions {

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
      total_i = parseFloat(this.catTotalsHash[cat_i].toFixed(2))
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