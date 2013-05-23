/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define(function(require) {
  var Backbone = require('backbone');
    
  require("jquery");
  require("jquerymobile");

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
