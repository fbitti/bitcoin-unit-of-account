// bugs: replaceHtml not working on https://www.theblockcrypto.com/linked/101912/binance-15th-quarterly-bnb-burn-token-highest-ever
// replaceHtml not working on https://etherscan.io/address/0x757e1d3A0f3998787aE173da15bB149660caF010

console.log("Bitcoin, Unit of Account");
console.log("Current bitcoin price powered by CoinDesk: https://www.coindesk.com/price/bitcoin");

var htmlOn = false;
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

    // elementsInsideBody.forEach(element => {
    //   element.childNodes.forEach(child => {
    //     if (child.nodeType === 1) {
    //       replaceAmazonHtmlRegex(child);
    //     }    
    //   });
    // });

    elementsInsideBody.forEach(element => {
      element.childNodes.forEach(child => {
        if (child.nodeType === 3) {
          if (htmlOn) { 
            replaceHtml(child.parentElement);
          } else {
            replaceText(child);
          }
        }
      });
    });

    console.log("The Bitcoin, Unit of Account extension replaced all $ amounts.");
    if (htmlOn) console.log("Hover over the replaced amount if you want to see the original value.");

    chrome.storage.local.set({"bitcoinPrice": bitcoinPrice}, function() {
      console.log("Storing the Bitcoin price of US$", bitcoinPrice.toFixed(2), "for future use.");
    });
  }
}

function replaceText(node) {
  console.log("replaceText was called");
  let text = node.nodeValue;
  let genericTextRegex = /(?:(?:\$|USD)(?:\s*)(\d[\d,]*(?:\.\d+)?)((K|G|M|Bn?|Tn?)|(?:\s+)(thousands?|millions?|billions?|bn|trillions?|tn))?)/gi;
  node.nodeValue = text.replace(genericTextRegex, convertText);
}

function convertText(match, amount, multiplier) {
  match = match.trim();
  let amountInUSD = parseFloat(amount.replaceAll(",",""));
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
      case "bn":
      case "b":
        amountInBTC *= 1000*1000*1000;
        break;
      case "trillions":
      case "trillion":
      case "tn":
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

  // result = initialHtmlText + 
  //         '<span title="$ ' + 
  //         amountValue +
  //         ' ' +
  //         multiplier +
  //         '">' + 
  //         result + 
  //         '</span>';
  // // console.log(result);

  return result;
}

function replaceAmazonHtmlRegex(node) {
  let html = node.innerHTML;
  let amazonHtmlRegex = /(?:<span class="a-price-symbol">\$<\/span><span class="a-price-whole">)([,\d]+)(?:<span class="a-price-decimal">\.<\/span><\/span><span class="a-price-fraction">)(\d+)(?:<\/span>)/gi;
  node.innerHTML = html.replace(amazonHtmlRegex, newAmazonHtml);
}

function newAmazonHtml(regexMatch, dollarAmount, centsAmount) {
  let amountInUSD = parseInt(dollarAmount) + parseInt(centsAmount)/100;
  let newAmount = amountInUSD / bitcoinPrice;

  let unit = "₿";
  let newCents = "00";
  // convert to the most visually pleasant unit
  if (newAmount < 0.001) {
    newAmount *= 1000*1000*100;
    newAmount = newAmount.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    unit = "sat";
  }
  // Placeholder condition in case we want to add µ₿
  // else if (amountInBTC < 0.001) {
  //   amountInBTC *= 1000*1000;
  //   amountInBTC = amountInBTC.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  //   unit = "µ₿";
  // } 
  else if (newAmount < 1.0) {
    newAmount *= 1000;
    newAmount = newAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    console.log(newAmount);
    newCents = newAmount.split('.')[1];
    newAmount = newAmount.split('.')[0];
    unit = "m₿";
  }
  else {
    newAmount = newAmount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    console.log(newAmount);
    newCents = amountInBTC.split('.')[1];
    newAmount = newAmount.split('.')[0];
  }

  if (unit == "sat") {
    return '<span class="a-price-whole">' + 
          newAmount + 
          '</span><span class="a-price-symbol">sat</span>';
  } else {
    return '<span class="a-price-symbol">' +
          unit + 
          '</span><span class="a-price-whole">' +
          newAmount + 
          '<span class="a-price-decimal">.</span></span><span class="a-price-fraction">' +
          newCents + 
          '</span>';
  }
}

function replaceHtml(node) {
  let html = node.innerHTML;
  node.innerHTML = html.replace(/(>[^<]*)((?:\$|USD)(?:\s*)(\d[\d,]*(?:\.\d+)?)((K|G|M|B|T)|(?:\s+)(thousands?|millions?|billions?|trillions?))?)/gi, convertHtml);
}

function convertHtml(match, initialHtmlText, amountText, amountValue, multiplier) {
  amountText = amountText.trim();
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