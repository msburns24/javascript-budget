import { Transactions } from "./modules/transactions.js";
import { DocumentHelper } from "./modules/document-helper.js";
import { CSVDataFrame } from "./modules/csv-data-frame.js";

function main() {

const filename = "./csv/2023.01.02_transactions.csv";
const rawData = new CSVDataFrame(filename);
const trans = rawData.asArrays;

let transObj = new Transactions(trans);
let docHelperObj = new DocumentHelper(document, transObj);

docHelperObj.addHeaderDates();
docHelperObj.addTotalSpends();
docHelperObj.addAllTopCategories();
docHelperObj.createTransPages();

}

main();