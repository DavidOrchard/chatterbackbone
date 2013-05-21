// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", 
      "backbone",
      "views/Feed",
      "views/FeedItemPoster",
      "views/FeedItemsCollection",
      "views/Login",
      "models/FeedItem",
      'collections/FeedItemsCollection',
      "routers/MobileRouter", 
      "jasminejquery"],

    function($, Backbone, FeedView, FeedItemPosterView, FeedItemsCollectionView, LoginView, FeedItemModel, FeedItemsCollection, MobileRouter) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Chatter Backbone Require", function() {

            // Backbone View Suite: contains all tests related to views
            describe("Backbone views", function() {

              // Runs before every View spec
              beforeEach(function() {

                setFixtures('<section id="feedContainer"><section id="feed-poster"></section><section id="feed-items-collection"></section></section>');
                this.feedModel = new FeedItemsCollection(news_feed_data['items']);
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
                beforeEach(function() {
                  this.feedItemPosterView = new FeedItemPosterView({model:this.feedModel});
                });
                
                it('feedItemPosterView returns the view object', function() {
                  expect(this.feedItemPosterView.render()).toEqual(this.feedItemPosterView);
                });
                
                it('feedposterview should have a tagname of "section"', function(){
                  expect(this.feedItemPosterView.el.tagName.toLowerCase()).toBe('section');
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