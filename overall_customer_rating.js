var casper = require("casper").create({
  verbose: true,
  logLevel: 'error',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  }
});

var url = 'https://www.bestbuy.com/site/ryze-tello-quadcopter-white-and-black/6201408.p?skuId=6201408';

var ratings = [];
var ratingTipes = [];

function getRatings() {
  var ratings = document.querySelectorAll('.c-review-average')
  return Array.prototype.map.call(ratings, function(e){
    return e.innerText;
  });
};

function getRatingTipes() {
  var dates = document.querySelectorAll('.ratings-header.heading-6.v-fw-regular');
  return Array.prototype.map.call(dates, function(e) {
    return e.innerText;
  });
};

casper.start(url, function() {
  this.echo(this.getTitle());
  this.click('a[class="us-link"]');
});

casper.wait(1000, function() {
    this.echo("I've waited for a second.");
    this.capture('screenshot00.png');
});

casper.then(function() {
  this.click('button[data-click-location="customerreviewstab"]');
  console.log('clicked reviews tab ');
});

casper.waitForSelector('.ratings-stars', function() {
  console.log('ratings loaded' );
});

casper.then(function() {
  ratings = this.evaluate(getRatings);
  ratingTipes = this.evaluate(getRatingTipes);
});
casper.then(function() {
  this.echo(ratingTipes[0] + ' ' + ratings[0]);
});

casper.run()