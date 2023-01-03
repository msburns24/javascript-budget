// export function main() {

//   function formatDollar(num, decimals) {
//     let outputNum = "$";

//     if (num >= 1000) {
//       let thousands = Math.floor(num / 1000);
//       outputNum += thousands.toString();
//       outputNum += ",";
//       num -= (thousands*1000);
//     }

//     outputNum += num.toFixed(decimals);
//     return outputNum;
//   }

//   function getMaxCat(catHash) {
//     let cats = Object.keys(catHash);
//     let vals = Object.values(catHash);

//     let maxVal = 0;
//     let maxCat = "";
//     for (let i=0; i<cats.length; i++) {
//       if (vals[i] > maxVal) {
//         maxVal = vals[i];
//         maxCat = cats[i];
//       }
//     }

//     return maxCat;
//   }

//   function getImg(cat) {
//     let catToImg = {
//       "Auto":"auto-gas.svg",
//       "Fun":"fun.svg",
//       "Groceries":"groceries.svg",
//       "Home":"home.svg",
//       "Alcohol":"home.svg",
//       "Restaurants":"restaurants.svg",
//       "Travel":"travel.svg",
//       "Internet": "utilities.svg",
//       "Electric & Water": "utilities.svg"
//     };
//     let imgFileStr = "./img/";
//     imgFileStr += catToImg[cat];
//     return imgFileStr;
//   }

//   function addTopCategory(cat, val) {
//     // Get parent nodes
//     let divSummary = document.querySelector(".top-categories");

//     // Add category summary
//     let newCatItem = document.createElement("div");
//     newCatItem.classList.add("top-cat-item");

//       let newImg = document.createElement("img");
//       newImg.setAttribute("src", getImg(cat));
//       newCatItem.appendChild(newImg);

//       let newCatInfo = document.createElement("div");
//       newCatInfo.classList.add("top-cat-info");
//         let newCatAmt = document.createElement("h3");
//         newCatAmt.innerText = formatDollar(val, 0);
//         newCatInfo.appendChild(newCatAmt);

//         let newCatCat = document.createElement("h4");
//         newCatCat.innerText = "Home";
//         newCatInfo.appendChild(newCatCat);
//       newCatItem.appendChild(newCatInfo);

//     divSummary.appendChild(newCatItem);
//   }

//   function appendRow(page, cat, date, vendor, amount) {
//     date = new Date(date).toLocaleDateString("en-us", {
//       "month": "short", "day": "numeric"
//     });
//     const catImgFile = getImg(cat);
//     amount = formatDollar(amount, 2);

//     const pageTableBody = document.querySelector("#" + page + " tbody");
//     let newRowEl = document.createElement('tr');
//       let newDataEl = document.createElement('td');
      
//       let newImageEl = document.createElement('img');
//         newImageEl.setAttribute('src', catImgFile);
//         newDataEl.appendChild(newImageEl);
//       newRowEl.appendChild(newDataEl);

//       newDataEl = document.createElement('td');
//       newDataEl.textContent = date;
//       newRowEl.appendChild(newDataEl);

//       newDataEl = document.createElement('td');
//       newDataEl.textContent = vendor;
//       newRowEl.appendChild(newDataEl);

//       newDataEl = document.createElement('td');
//       newDataEl.textContent = amount;
//       newRowEl.appendChild(newDataEl);
    
//     pageTableBody.appendChild(newRowEl);
//   }

//   // 

//   let trans = {
//     "Date":["12/31/2022","12/31/2022","12/31/2022","12/31/2022","12/31/2022","12/31/2022","12/30/2022","12/30/2022","12/28/2022","12/28/2022","12/28/2022","12/28/2022","12/27/2022","12/26/2022","12/26/2022","12/26/2022","12/26/2022"],
//     "Vendor":["Raleigh Beer Garden","BP","Jersey Mike's","Target","Bulbox","Dank Burrito","Harris Teeter","Kohl's","Wake County ABC","Blue Pearl Animal Hospital","Five Guys","Harris Teeter","Amazon","Amazon","Amazon","Amazon","Amazon"],
//     "Category":["Restaurants","Auto","Restaurants","Home","Restaurants","Restaurants","Groceries","Home","Alcohol","Home","Restaurants","Groceries","Home","Home","Home","Home","Home"],
//     "Amount":[86.59,42.43,23.12,47.29,22.6,18.61,91.31,16.08,111.07,766.64,39.84,309,73.48,5.35,23.58,34.53,134.87]
//   };


//   let dates = trans["Date"];
//   let vendors = trans["Vendor"];
//   let cats = trans["Category"];
//   let amts = trans["Amount"];

//   let cat_totals = {}

//   let cat_i;
//   let amt_i;
//   let total_spend = 0;
//   for (let i=0; i<dates.length; i++) {
//     cat_i = cats[i];
//     amt_i = amts[i];
//     if (cat_totals[cat_i]) {
//       cat_totals[cat_i] += amt_i;
//     } else {
//       cat_totals[cat_i] = amt_i;
//     }

//     total_spend += amt_i;
//   }

//   // Convert float to 2 dec places
//   let total_i = 0;
//   for (let i=0; i<(Object.keys(cat_totals).length); i++) {
//     cat_i = Object.keys(cat_totals)[i];
//     total_i = parseFloat(cat_totals[cat_i].toFixed(2))
//     cat_totals[cat_i] = total_i;
//   }
//   total_spend = parseFloat(total_spend.toFixed(2));

//   // get header dates
//   const monthYear = new Date(dates[0]).toLocaleDateString("en-us", {
//     "month": "short", "year": "numeric"
//   });
//   let options = { 'weekday': "short", "month": "short", "day": "numeric"}
//   const maxDate = new Date(dates[0]).toLocaleDateString('en-us', options);
//   const minDate = new Date(dates[dates.length-1]).toLocaleDateString('en-us', options);

//   // Add header dates
//   const headerH1 = document.querySelector("header h1");
//   let newH1Text = headerH1.textContent;
//   newH1Text += monthYear;
//   headerH1.textContent = newH1Text;
//   const headerH2 = document.querySelector("header h2");
//   let newH2Text = minDate + " - " + maxDate;
//   headerH2.textContent = newH2Text;

//   // Add Total Spends
//   const totalSpendEl = document.querySelector("#total-spend");
//   totalSpendEl.textContent = formatDollar(total_spend, 0);
//   const emmaPortion = total_spend/2;
//   const emmaPortionEl = document.querySelector("#emma-portion");
//   emmaPortionEl.textContent = formatDollar(emmaPortion, 0);


//   // Get top 3 cats
//   let topCats = [];
//   let topVals = [];
//   let currMaxCat = "";
//   for (let i=0; i < Object.keys(cat_totals).length; i++) {
//     currMaxCat = getMaxCat(cat_totals);
//     topCats.push(currMaxCat);
//     topVals.push(cat_totals[currMaxCat]);
//     delete cat_totals[currMaxCat];
//   }

//   // Add cats to html
//   for (let i=0; i<topCats.length; i++) {
//     addTopCategory(topCats[i], topVals[i]);
//   }

//   // Add page 2 transactions
//   for (let i=0; i<10; i++) {
//     appendRow("page-2", cats[i], dates[i], vendors[i], amts[i]);
//   }

//   for (let i=10; i<cats.length; i++) {
//     appendRow("page-3", cats[i], dates[i], vendors[i], amts[i]);
//   }

// }