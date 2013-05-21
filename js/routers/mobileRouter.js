 // Mobile Router
// =============

// Includes file dependencies
define([ "jquery","backbone", "jquerymobile" ], function( $, Backbone ) {

  // Extends Backbone.Router
  var ChatterRouter = Backbone.Router.extend( {

    // The Router constructor
    initialize: function() {
      
      this.route(/^([A-Za-z0-9]{18})$/, this.getEntity);
 
      // Tells Backbone to start watching for hashchange events
      Backbone.history.start();

    },

    // Backbone.js Routes
    routes: {

      // When there is no hash on the url, the home method is called
      "": "home",
      "home": "home",
      "about": "about",
      "chatter-feed": "home"
    },

    about: function() {
       $.mobile.changePage( "#about" , { reverse: false, changeHash: false } );
    },

    home: function() {
       $.mobile.changePage( "#chatter-feed", { reverse: false, changeHash: false } );
    },
    
    getEntity: function( entity ) {
      alert("gotEntity" + entity);
      $.mobile.changePage( "#");
    }
     
  } );

  // Returns the Router class
  return ChatterRouter;

} ); 
