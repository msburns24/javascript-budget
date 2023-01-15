const csv = require('jquery-csv');
const fs = require('fs');

class CSVDataFrame {

  constructor(filename) {
    this.filename = filename;
    const file = fs.readFileSync(this.filename).toString();
    this.rowData = csv.toObjects(file);
    this.asArrays = this.getArrays();
  }

  getArrays () {
    this.headers = Object.keys(this.rowData[0]);

    const hdrCount = this.headers.length;
    const rowCount = this.rowData.length;
    let asArrays = {}

    for (let row=0; row<rowCount; row++) {
      for (let col=0; col<hdrCount; col++) {
        if (row == 0) {
          asArrays[this.headers[col]] = [this.rowData[row][this.headers[col]]];
        } else {
          asArrays[this.headers[col]].push(this.rowData[row][this.headers[col]]);
        }
      }
    }

    // Trim whitespace from keys
    let asArraysTrimmed = {};
    for (let i=0; i<this.headers.length; i++) {
      let hdr = this.headers[i];
      let valuesArray = asArrays[hdr];
      hdr = (hdr == hdr.trim() ? hdr : hdr.trim())
      asArraysTrimmed[hdr] = valuesArray;
    }
    asArrays = asArraysTrimmed;
    
    return asArrays;
  }

  trimWhiteSpace(word) {
    return word.trim();
  }

  toJSON() {
    let asArraysString = JSON.stringify(this.asArrays);
    let newFilename = this.filename.replace('.csv', '.json');   // Change filetype
    newFilename = newFilename.replace("csv/", "json/");         // Change directory
    fs.writeFileSync(newFilename, asArraysString);
  }
}

module.exports = CSVDataFrame;