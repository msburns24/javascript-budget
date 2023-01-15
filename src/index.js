import { Transactions } from "./modules/transactions.js";
import { DocumentHelper } from "./modules/document-helper.js";

// import { CSVDataFrame } from "./modules/csv-data-frame.js";
// const filename = "./../csv/2023.01.08_transactions.csv";
// const rawData = new CSVDataFrame(filename);
// const trans = rawData.asArrays;
const trans = require('./../json/2023.01.08_transactions.json');


let transObj = new Transactions(trans);
let docHelperObj = new DocumentHelper(document, transObj);

docHelperObj.addHeaderDates();
docHelperObj.addTotalSpends();
docHelperObj.addAllTopCategories();
docHelperObj.createTransPages();