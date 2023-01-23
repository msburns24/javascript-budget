import { Transactions } from "./modules/transactions.js";
import { DocumentHelper } from "./modules/document-helper.js";

const trans = require('./../json/2023.01.20_transactions.json');


let transObj = new Transactions(trans);
let docHelperObj = new DocumentHelper(document, transObj);

docHelperObj.addHeaderDates();
docHelperObj.addTotalSpends();
docHelperObj.addAllTopCategories();
docHelperObj.createTransPages();