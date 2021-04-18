// bugs: not working on https://www.theblockcrypto.com/linked/101912/binance-15th-quarterly-bnb-burn-token-highest-ever
// not working on https://etherscan.io/address/0x757e1d3A0f3998787aE173da15bB149660caF010

console.log("Bitcoin, Unit of Account");

var bitcoinPrice;

fetch('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
  .then(response => response.json())
  .then(responseObj => { 
    bitcoinPrice = responseObj.bpi.USD.rate_float;
    // replace the text as soon as the page is loaded
    window.onload = setTimeout(findAndReplace, 1000);
  })
  .catch(error => {
    // if we cannot use the real-time Bitcoin price,
    // try to use the last one we stored
    chrome.storage.local.get(["bitcoinPrice"], (result) => {
      if (Boolean(result.bitcoinPrice)) {
        bitcoinPrice = result.bitcoinPrice;
        // console.warn("The extension ₿ - Unit of Account is using a recently saved price of $", bitcoinPrice);
        window.onload = setTimeout(findAndReplace, 1000);
      } else {
        bitcoinPrice = null;
        console.warn("The extension ₿ - Unit of Account was not able to retrieve a recent Bitcoin price and is not replacing any dollar prices due to error", error);
        console.warn("Reload the webpage if you want to try again.");  
      }
    });
  });

// Find all the US$ amounts in the page and replace by ₿
function findAndReplace() {
  if (Boolean(bitcoinPrice)) {
    // console.log("The extension ₿ - Unit of Account the current price of $", bitcoinPrice, "\nPowered by Coindesk https://www.coindesk.com/price/bitcoin");
    // This makes an array of everything inside the body tag
    var elementsInsideBody = [...document.body.getElementsByTagName("*")];

    elementsInsideBody.forEach(element => {
      element.childNodes.forEach(child => {
        if (child.nodeType === 3) {
          replaceHtml(child.parentElement);
        }
      });
    });

    console.log("The Bitcoin, Unit of Account extension replaced all $ amounts.");
    console.log("Hover over the replaced amount if you want to see the original value.");

    chrome.storage.local.set({"bitcoinPrice": bitcoinPrice}, function() {
      console.log("Storing the Bitcoin price of US$", bitcoinPrice.toFixed(2), "for future use.");
    });
  }
}

function replaceHtml(node) {
  let html = node.innerHTML;
  node.innerHTML = html.replace(/(>[^<]*)((?:\$|USD)(?:\s*)(\d[\d,]*(?:\.\d+)?)((K|G|M|B|T)|(?:\s+)(thousands?|millions?|billions?|trillions?))?)/gi, convert);
}

function convert(match, initialHtmlText, amountText, amountValue, multiplier) {
  amountText = match.trim();
  let amountInUSD = parseFloat(amountValue.replaceAll(",",""));
  let amountInBTC = amountInUSD / bitcoinPrice;

  if (Boolean(multiplier)) {
    multiplier = multiplier.toLowerCase().trim(); 
    switch(multiplier) {
      case "thousands":
      case "thousand":
      case "k":
      case "g":
        amountInBTC *= 1000;
        break;
      case "millions":
      case "million":
      case "m":
        amountInBTC *= 1000*1000;
        break;
      case "billions":
      case "billion":
      case "b":
        amountInBTC *= 1000*1000*1000;
        break;
      case "trillions":
      case "trillion":
      case "t":
        amountInBTC *= 1000*1000*1000*1000;
        break;
    }
  } else {
    multiplier = "";
  }

  let unit = "₿";
  // convert to the most visually pleasant unit
  if (amountInBTC < 0.001) {
    amountInBTC *= 1000*1000*100;
    amountInBTC = amountInBTC.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    unit = "sat";
  }
  // Placeholder condition in case we want to add µ₿
  // else if (amountInBTC < 0.001) {
  //   amountInBTC *= 1000*1000;
  //   amountInBTC = amountInBTC.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  //   unit = "µ₿";
  // } 
  else if (amountInBTC < 1.0) {
    amountInBTC *= 1000;
    amountInBTC = amountInBTC.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    unit = "m₿";
  }
  else {
    amountInBTC = amountInBTC.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }

  let result;

  // ₿ comes before the value, but sats come after
  if (unit == "sat") {
    result = " " + amountInBTC + " " + unit;
  } else {
    result = " " + unit + " " + amountInBTC;
  }

  result = initialHtmlText + 
          '<span title="$ ' + 
          amountValue +
          ' ' +
          multiplier +
          '">' + 
          result + 
          '</span>';
  // console.log(result);

  return result;
}