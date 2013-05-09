// Filename: main.js

// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
  forcetk: 'lib/forcetk',
  forcetkui: 'lib/forcetk.ui',
  text: 'text'
 },
  urlArgs: "ts="+new Date().getTime(),
  shim: {        
        forcetk:{
            deps:['jquery'],
            exports:'forcetk'
        }
    }

});

require([

  // Load our app module and pass it to our definition function
  'app',
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();

var sf_token;
});