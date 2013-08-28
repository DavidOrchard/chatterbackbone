/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

require.config( {
  baseUrl: "js",
  paths: {
    jquery: 'lib/jquery',
    jquerymobile: 'lib/jquery.mobile',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    forcetk: 'lib/forcetk',
    forcetkui: 'lib/forcetk.ui',
    
    // Plugins
    
    jasminejquery: 'lib/plugins/jasmine-jquery',    
    text: 'text'
  },
  shim: {        
        forcetk:{
            deps:['jquery'],
            exports:'forcetk'
        },
        
        // Jasmine-jQuery plugin
        "jasminejquery": {
            deps:['jquery'],
            exports:'jquery'
         },
         
         newsfeedstatic:{
           exports:'news_feed_data'      
         } 
    }
});

// Can this be done in Common JS style?  I tried once and it seemed to break phantomjs
define(['jquery',
"backbone",
"views/Feed",
"views/FeedItemPoster",
"views/FeedItemsCollection",
"models/FeedItem",
'collections/FeedItemsCollection',
"routers/mobileRouter", 
'newsfeedstatic',
"jasminejquery"],
function($, Backbone, FeedView, FeedItemPosterView, FeedItemsCollectionView, FeedItemModel, FeedItemsCollection, MobileRouter, news_feed_data ) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Chatter Backbone Require", function() {

            // Backbone View Suite: contains all tests related to views
            describe("Backbone views", function() {

              // Runs before every View spec
              beforeEach(function() {

                setFixtures('<section id="feedContainer"><section id="feed-poster"></section><section id="feed-items-collection"></section></section>');
                this.feedModel = new FeedItemsCollection(news_feed_data.items);
              });

              describe("FeedItemsCollectionView", function() {
                beforeEach(function() {
                  this.feedItemsCollectionView = new FeedItemsCollectionView({
                    collection: this.feedModel,
                  });
                });
                
                it('FeedItemsCollectionView returns the view object', function() {
                  expect(this.feedItemsCollectionView.render()).toEqual(this.feedItemsCollectionView);
                });

                it('feeditemscollectionview should have a tagname of "section"', function(){
                  expect(this.feedItemsCollectionView.el.tagName.toLowerCase()).toBe('section');
                });
              });                 
              // feedView doesn't render directly, renders feeditemcollection and poster

              describe("FeedItemsPosterView", function() {
                var posterShareButton = ".postersharebutton";
                beforeEach(function() {
                  this.feedItemPosterView = new FeedItemPosterView({model:this.feedModel});
                  spyOnEvent(posterShareButton, 'click');
                  spyOn(this.feedItemPosterView, 'post');
                  this.feedItemPosterView.delegateEvents();
                  
                });
                
                it('feedItemPosterView returns the view object', function() {
                  expect(this.feedItemPosterView.render()).toEqual(this.feedItemPosterView);
                });
                
                it('feedposterview should have a tagname of "section"', function(){
                  expect(this.feedItemPosterView.el.tagName.toLowerCase()).toBe('section');
                });
                
                it('postersharebutton click should generate click event', function() {                  
                  $(posterShareButton).click();
                  expect('click').toHaveBeenTriggeredOn($(posterShareButton));
                });
                
                it('postersharebutton click should call post function', function() {                  
                  $(posterShareButton).click();
                  expect(this.feedItemPosterView.post).toHaveBeenCalled();
                });
              });

            }); // End of the View test suite

            // Backbone Model Suite: contains all tests related to models
/*            describe("Backbone models", function() {

                // Runs before every Model spec
                beforeEach(function() {

 
                });

                it("should be in a valid state", function() {

                    expect(this.model.isValid()).toBe(true);

                });

                it("should call the validate method when setting a property", function() {

                    this.model.set({ example: "test" }, { validate: true });

                    expect(Model.prototype.validate).toHaveBeenCalled();

                });

            }); // End of the Model test suite
*/
        // Backbone Collection Suite: contains all tests related to collections
/*        describe("Backbone collections", function() {

            // Runs before every Collection spec
            beforeEach(function() {

                // Instantiates a new Collection instance
                this.collection = new Collection();

            });

            it("should contain the correct number of models", function() {

                expect(this.collection.length).toEqual(0);

            });

        }); // End of the Collection test suite
*/
        // Backbone Mobile Router Suite: contains all tests related to Mobile routers
        describe("Backbone mobile routers", function () {

            // Runs before every Mobile Router spec
            beforeEach(function () {

                // Stops the router from listening to hashchange events (Required because Backbone will only allow you to run Backbone.history.start() once for each page load.)
                Backbone.history.stop();

                // Instantiates a new Router instance
                this.router = new MobileRouter();

                // Creates a Jasmine spy
                this.routeSpy = jasmine.createSpy("home");

                // When the route index method is called, the Jasmine spy is also called
                this.router.on("route:home", this.routeSpy);

            });
            
            it("should call the mobile router home method when there is a #home on the url", function() {
 
                 // Navigates to home
                 this.router.navigate("#home");

                 // Navigates to the default route
                 this.router.navigate("", { trigger: true });

                 // Expects the Jasmine spy to have been called
                 expect(this.routeSpy).toHaveBeenCalled();

             });
            

            it("should call the mobile router home method when there is no hash on the url", function() {

                // Navigates to a different route
                this.router.navigate("elsewhere");

                // Navigates to the default route
                this.router.navigate("", { trigger: true });

                // Expects the Jasmine spy to have been called
                expect(this.routeSpy).toHaveBeenCalled();

            });

        }); // End of the Mobile Router test suite

    }); // End of the Chatter Backbone Require test suite

});