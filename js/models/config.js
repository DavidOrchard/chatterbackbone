/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define([
  'underscore',
  'backbone',
  'models/config.dev',
  'models/config.prod'
], function(_, Backbone, ConfigDev, ConfigProd){
	// config Model
	// This a factory.  Seems overly hard
	var ConfigModel = null;
	var generalConfig = { 
			userName :'',
    	password : ''
    };
	// ----------
//	console.log("window.location.hostname = " + window.location.hostname);
//	console.log("window.location.href = " + window.location.href);
// Jasmine in PhantomJS doesn't have a window.location.hostname, and href points to file: URI;
// Jasmine in PhantomJS doesn't like throw "foo" or throw new Error;
	switch( window.location.hostname ){
      case "localhost":
      case "127.0.0.1":
		ConfigModel = ConfigDev.extend({defaults: _.extend({},ConfigDev.prototype.defaults, generalConfig)});
        break;
      case "chatterbackbone.herokuapp.com":
	  case "herokuapp.com":
        ConfigModel = ConfigProd.extend({defaults: _.extend({},ConfigProd.prototype.defaults, generalConfig)});
        break;
    default:
        ConfigModel = ConfigDev.extend({defaults: _.extend({},ConfigDev.prototype.defaults, generalConfig)});
   }
	return new ConfigModel();

});