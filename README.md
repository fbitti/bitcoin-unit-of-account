# Bitcoin, Unit of Account
A chrome extension to replace amounts of US$ by Bitcoin.
When reading the news or shopping online you constantly see the price of things in US$ and mentions of US$ amounts spent by corporations and the government. This Chrome extension converts US$ -> bitcoin in some of the most popular online newspapers available in English, as well as Amazon and Wikipedia.

## Why?
In the discussions about cryptocurrencies one of the most prominent topics is whether Bitcoin will ever become a unit of account, in other words, will currency amounts ever be expressed in BTC, not US$?
I created this extension for fun, and to let you experience such hypothetical future where bitcoin is used as a unit of account. In no way it reflects a belief this future will happen so do not interpret it financial advice.
If you ever had the curiosity to know how would it feel reading news and shopping online with bitcoin as a unit of account, this extension is for you.

## How does it work?
When you turn on this extension, and browse an enabled website, at each webpage it will:
1. wait a few seconds, so most of the dollar amounts become available. This is especially important on online stores, as they typically make personalised recommendations for you by loading the products and prices on the fly, while you browse the website.
2. retrieve the current bitcoin price from https://api.coindesk.com/v1/bpi/currentprice/USD.json ("powered by Coindesk")
3. run a script that reads all dollar amounts on the page and convert them to bitcoin.
 
The replacement of US$ amounts by the bitcoin equivalent happens only once to avoid consuming too much resources on your browser and computer. Therefore, if the webpage is constantly refreshing the prices, you will start seeing the bitcoin amount replaced by US$ amounts again.  I believe this is the right design decision as it is enough to demonstrate a concept.

You may not see dollar amounts being replaced in:
- ads
- images
- anywhere where they are not placed after a dollar identifier ($, US$, USD, etc)

## Where?
The following websites are currently supported:
- https://www.amazon.com
- https://en.wikipedia.org
- https://edition.cnn.com
- https://www.nytimes.com
- https://www.washingtonpost.com
- https://www.breitbart.com
- https://www.foxnews.com
- https://www.huffpost.com
- https://www.vice.com
- https://www.usatoday.com
- https://www.npr.org
- https://www.cbsnews.com
- https://www.usnews.com
- https://www.nbcnews.com
- https://www.politico.com
- https://www.theatlantic.com
- https://time.com
- https://www.newsweek.com
- https://abcnews.go.com
- https://www.reuters.com
- https://slate.com
- https://www.thedailybeast.com
- https://www.vox.com
- https://www.ijreview.com
- https://www.zerohedge.com
- https://www.latimes.com
- https://www.drudgereport.com
- https://www.chron.com
- https://www.msnbc.com
- https://qz.com
- https://www.nydailynews.com
- https://nypost.com
- https://www.sfgate.com
- https://www.salon.com
- https://www.dailykos.com
- https://www.apnews.com
- https://www.theblaze.com
- https://www.upworthy.com
- https://www.mic.com
- https://www.chicagotribune.com
- https://www.newyorker.com
- https://nymag.com
- https://www.dailymail.co.uk
- https://www.telegraph.co.uk
- https://www.independent.co.uk
- https://www.express.co.uk
- https://www.thesun.co.uk
- https://www.mirror.co.uk
- https://www.ft.com
- https://metro.co.uk
- https://www.newsnow.co.uk
- https://www.dailystar.co.uk
- https://www.huffingtonpost.co.uk
- https://www.standard.co.uk
- https://www.manchestereveningnews.co.uk
- https://www.thetimes.co.uk
- https://www.liverpoolecho.co.uk
- https://www.dailyrecord.co.uk
- https://www.spectator.co.uk
- https://www.newstatesman.com
- https://www.walesonline.co.uk
- https://www.birminghammail.co.uk
- https://www.scotsman.com
- https://www.theguardian.com
- https://www.chroniclelive.co.uk
- https://www.belfasttelegraph.co.uk
- https://www.theweek.co.uk
- https://www.lbc.co.uk
- https://www.heraldscotland.com
- https://www.thedailymash.co.uk
- https://www.bournemouthecho.co.uk

## Examples
Let me give you 2 examples, the 1st one from a news page that originally reads:
"Stocks mixed as June begins, oil nears $68 per barrel
AMC Entertainment Holdings plans to raise $230.5M through a share sale"
On June 1st, 2021, this text was replaced by:
"Stocks mixed as June begins, oil nears m??? 1.87 per barrel
AMC Entertainment Holdings plans to raise ??? 6,354 through a share sale"

The 2nd example is an Amazon's deal of the day:
"$157.50 Price:  $196.99  (20% off)"
which was replaced by:
"m??? 4.34 Price:  m??? 5.42  (20% off)"

To view the original prices, you need to disable the extension and reload the page.

## Screenshots
### Amazon
![Amazon](https://github.com/fbitti/bitcoin-unit-of-account/blob/d851ca16b8dbe503fb9b62b37b91503ab7c68da7/images/promo-screenshot-1.png)
### Wikipedia
![Wikipedia](https://github.com/fbitti/bitcoin-unit-of-account/blob/d851ca16b8dbe503fb9b62b37b91503ab7c68da7/images/promo-screenshot-4.png)
### CNN
![CNN](https://github.com/fbitti/bitcoin-unit-of-account/blob/d851ca16b8dbe503fb9b62b37b91503ab7c68da7/images/promo-screenshot-3.png)
### Fox News
![Fox News](https://github.com/fbitti/bitcoin-unit-of-account/blob/d851ca16b8dbe503fb9b62b37b91503ab7c68da7/images/promo-screenshot-2.png)

## Disclaimers
I'm not associated in any way with these companies and any text replacement will happen only in your browser, without their knowledge.

You won't be able to pay in bitcoins if the online store does not accept it. Even if it does accept bitcoin, this extension's calculations may differ, thus make sure you rely on the online store's own conversion rate.

## Contributions
Feel free to submit pull requests

## Contact
You may reach me out at https://twitter.com/f_bitti