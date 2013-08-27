casper.test.begin('The fixedLogin exists', function suite(test) {
  var x = require('casper').selectXPath;
  var rand = Math.random(100000);
  var posterInput = "from gene" + rand;
  casper.start("https://chatterbackbone.herokuapp.com/", function() {
      test.assertExists('a.fixedLogin', "fixedLogin anchor is found");
      this.clickLabel('Pre-assigned username/password Login');
  });
  
  casper.then(function() {
    casper.waitForText('Share', function () {
      test.assertExists('a.postersharebutton', "poster share button is found");
    });
  });
  
  casper.then(function() {
    test.assertEval(function() {
        return document.querySelector("#feed-items-collection-placeholder").children.length > 2;
      });
  });
  casper.waitForSelector("textarea",
      function success() {
          this.test.assertExists("textarea");
          this.click("textarea");
      },
      function fail() {
          this.test.assertExists("textarea");
  });
  casper.waitForSelector("textarea",
      function success() {
          this.sendKeys("textarea", posterInput);
      },
      function fail() {
          this.test.assertExists("textarea");
  });
  casper.waitForSelector("a.postersharebutton",
      function success() {
          this.test.assertExists("a.postersharebutton");
          this.click("a.postersharebutton");
      },
      function fail() {
          this.test.assertExists(".postersharebutton.ui-btn.ui-shadow.ui-btn-corner-all.ui-mini.ui-btn-inline.ui-btn-hover-c.ui-btn-up-c .ui-btn-text");
  });
  casper.waitForText(posterInput, 
    function success() {
 //     this.test.assertEval(function(posterInput) { return document.querySelector(".feeditembody span").textContent.indexOf(posterInput) > 0;}, posterInput);
 //   var evalResult = casper.evaluate(function(posterInput) { return document.querySelector(".feeditembody span").textContent.indexOf(posterInput) > 0;}, posterInput);
    this.test.assertTruthy(casper.evaluate(function(posterInput) { return document.querySelector(".feeditembody span").textContent.indexOf(posterInput) > 0;}, posterInput));
    },
    function fail() {
        this.test.assertExists("textarea");
  });
  
  casper.waitForSelector(x("//a[normalize-space(text())='Like']"),
      function success() {
          this.test.assertExists(x("//a[normalize-space(text())='Like']"));
          this.click(x("//a[normalize-space(text())='Like']"));
      },
      function fail() {
          this.test.assertExists(x("//a[normalize-space(text())='Like']"));
  });
  
    casper.run( function() {
      test.done();
    });
});
