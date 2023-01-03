import { Transactions } from "./modules/transactions.js";
import { DocumentHelper } from "./modules/document-helper.js";

function main() {
  
 let trans = {
    "Date":["12/31/2022","12/31/2022","12/31/2022","12/31/2022","12/31/2022","12/31/2022","12/30/2022","12/30/2022","12/28/2022","12/28/2022","12/28/2022","12/27/2022","12/27/2022","12/26/2022","12/26/2022","12/26/2022","12/26/2022", "12/25/2022"],
    "Vendor":["Raleigh Beer Garden","BP","Jersey Mike's","Target","Bulbox","Dank Burrito","Harris Teeter","Kohl's","Wake County ABC","Five Guys","Harris Teeter","HelloFresh","Amazon","Amazon","Amazon","Amazon","Amazon", "Spectrum"],
    "Category":["Restaurants","Auto","Restaurants","Home","Restaurants","Restaurants","Groceries","Home","Alcohol","Restaurants","Groceries","Groceries","Home","Home","Home","Home","Home", "Internet"],
    "Amount":[206.59,42.43,23.12,47.29,22.6,18.61,91.31,16.08,111.07,39.84,309,73.48,73.15,5.35,23.58,34.53,134.87,68.55]
  };

  let transObj = new Transactions(trans);
  let docHelperObj = new DocumentHelper(document, transObj);

  docHelperObj.addHeaderDates();
  docHelperObj.addTotalSpends();
  docHelperObj.addAllTopCategories();
  docHelperObj.createTransPages();

}

main();