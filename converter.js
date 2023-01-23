const CSVDataFrame = require('./src/modules/csv-data-frame');

const filename = "./csv/2023.01.20_transactions.csv";
const rawData = new CSVDataFrame(filename);
rawData.toJSON();
const trans = rawData.asArrays;

// console.log(trans);