//==============================================================================
// Casper generated Mon Aug 26 2013 14:59:59 GMT-0700 (PDT)
//==============================================================================

casper.test.begin('chatter backbone tests', function suite(test) {
  var x = require('casper').selectXPath;

casper.start("https://chatterbackbone.herokuapp.com/", function() {});
casper.waitForSelector("a.fixedLogin",
    function success() {
        this.test.assertExists("a.fixedLogin");
        this.click("a.fixedLogin");
    },
    function fail() {
        this.test.assertExists(".fixedLogin.preLogin.ui-btn.ui-shadow.ui-btn-corner-all.ui-mini.ui-btn-inline.ui-btn-hover-c.ui-btn-up-c .ui-btn-text");
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
        this.sendKeys("textarea", "from gene2");
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
casper.waitForSelector(x("//a[normalize-space(text())='Like']"),
    function success() {
        this.test.assertExists(x("//a[normalize-space(text())='Like']"));
        this.click(x("//a[normalize-space(text())='Like']"));
    },
    function fail() {
        this.test.assertExists(x("//a[normalize-space(text())='Like']"));
});

casper.run(function() {test.done();});
});
