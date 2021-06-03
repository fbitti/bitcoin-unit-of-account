# Bitcoin, Unit of Account
A chrome extension to replace amounts of US$ by Bitcoin.

## Why?
I created this extension for fun, and to let you experience an hypothetical future where bitcoin is used as a unit of account. In no way it reflects a belief this future will happen and must not be considered financial advice.
In the discussions about cryptocurrencies one of the most prominent topics is whether Bitcoin will ever become a unit of account, in other words, currency amounts will be expressed in BTC, not dollars.
So, now, when reading the news or shopping online you constantly see dollar amounts. If you ever had the curiosity to know how much that amount would be if converted to bitcoins, this extension is for you.

## Where?
The following websites are supported:
- https://www.amazon.com
- https://en.wikipedia.org
- https://www.cnn.com
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

## How does it work?
When you turn on this extension, it will:
1. wait a few seconds, so most of the dollar amounts become available. This is especially important on online stores, as they typically make personalised recommendations for you by loading the products and prices on the fly, while you browse the website.
2. retrieve the current bitcoin price ("powered by Coindesk")
3. run a script that reads all dollar amounts on the page and convert them to bitcoin.
 
The conversion from dollar to bitcoin happens only once to prevent consuming too much resources from your browser and from your computer. Therefore, if the page you are looking at constantly refreshes the prices, you will start seeing dollar amounts again.  I believe this is the right design decision as it is enough to demonstrate a concept.

## Examples
Let me give you 2 examples, the 1st one from a news page that originally reads:
"Stocks mixed as June begins, oil nears $68 per barrel
AMC Entertainment Holdings plans to raise $230.5M through a share sale"
On June 1st, 2021, this text was replaced by:
"Stocks mixed as June begins, oil nears m₿ 1.87 per barrel
AMC Entertainment Holdings plans to raise ₿ 6,354 through a share sale"

The 2nd example is an Amazon's deal of the day:
"$157.50 Price:  $196.99  (20% off)"
which was replaced by:
"m₿ 4.34 Price:  m₿ 5.42  (20% off)"

In order to view the original prices, you need to disable the extension and reload the page.

## Screenshots


## Disclaimer
You won't be able to pay in bitcoins if the online store does not accept it. Even if it does accept bitcoin, this extension's calculations may differ, thus make sure you rely on the online store's own conversion rate.