/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
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

define(function(require) {
    var $ = require('jquery'),
      Backbone = require('backbone'),
      App = require('app'),
      MobileRouter = require('routers/mobileRouter');

// mobile init isn't fired at this time.  Loaded earlier somehow
//  $( document ).on( "mobileinit",
    // Set up the "mobileinit" handler before requiring jQuery Mobile's module
//    function() {
      // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
      $.mobile.linkBindingEnabled = false;

      // Disabling this will prevent jQuery Mobile from handling hash changes
      $.mobile.hashListeningEnabled = false;

      App.initialize();     
//    }
//  );

    this.router = new MobileRouter();
  
});