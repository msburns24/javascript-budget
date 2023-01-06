const csv = require('jquery-csv');
const fs = require("fs");

export class CSVDataFrame {

  constructor(filename) {
    const file = fs.readFileSync(filename).toString();
    this.rowData = csv.toObjects(file);
    this.asArrays = this.getArrays();
  }

  getArrays () {
    this.headers = Object.keys(this.rowData[1]);
    const hdrCount = this.headers.length;
    const rowCount = this.rowData.length;
    let asArrays = {}

    for (let i=0; i<rowCount; i++) {
      for (let j=0; j<hdrCount; j++) {
        // console.log(`Current field: ${this.headers[j]}`)
        // console.log(`Current value: ${this.rowData[i][this.headers[j]]}`)
        if (i == 0) {
          asArrays[this.headers[j]] = [this.rowData[i][this.headers[j]]];
        } else {
          asArrays[this.headers[j]].push(this.rowData[i][this.headers[j]]);
        }
      }
    }
    
    return asArrays;
  }
}

// let myData = new CSVDataFrame("./csv/2023.01.02_transactions.csv");
// console.log(myData.asArrays)