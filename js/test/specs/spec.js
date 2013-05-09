// Jasmine Unit Testing Suite
// --------------------------
define(["jquery", 
      "backbone",
      "views/Feed",
      "views/Login",
      "models/FeedItem",
      "routers/MobileRouter", 
      "jasminejquery"],

    function($, Backbone, LoginView, FeedView, FeedItemModel, MobileRouter) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Chatter Backbone Require", function() {

            // Backbone View Suite: contains all tests related to views
/*            describe("Backbone views", function() {

                // Runs before every View spec
                beforeEach(function() {

                    // Instantiates a new View instance
                    this.view = new FeedView();

                });

                it("should contain the correct view element", function() {

                    this.router = new MobileRouter();

                });

 
            }); // End of the View test suite
*/
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

                 // Navigates to a different route
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