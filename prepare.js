const CSVDataFrame = require('./src/modules/csv-data-frame');

const filename = "./csv/2023.01.08_transactions.csv";
const rawData = new CSVDataFrame(filename);
rawData.toJSON();