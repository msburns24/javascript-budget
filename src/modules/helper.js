export function formatDollar(num, decimals) {
  // Convert num to float, just in case.
  num = parseFloat(num);
  
  let outputNum = "$";

  if (num >= 1000) {
    let thousands = Math.floor(num / 1000);
    outputNum += thousands.toString();
    outputNum += ",";
    num -= (thousands*1000);
  }

  // console.log(num, ", type: ", typeof num);
  outputNum += num.toFixed(decimals);
  return outputNum;
}

export function getImg(cat) {
  let catToImg = {
    "Auto":"auto-gas.svg",
    "Fun":"fun.svg",
    "Groceries":"groceries.svg",
    "Delivery":"delivery.svg",
    "Home":"home.svg",
    "Home & Kingsley":"home.svg",
    "Alcohol":"home.svg",
    "Restaurants":"restaurants.svg",
    "Travel":"travel.svg",
    "Internet": "utilities.svg",
    "Electric & Water": "utilities.svg"
  };
  let imgFileStr = "./img/";
  imgFileStr += catToImg[cat];
  return imgFileStr;
}