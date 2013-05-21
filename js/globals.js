/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Filename: global.js
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  var sf_token = null;  // Not currently used, but the clientUI uses it
      
  // Must be a better way to have a global way of sharing.
  // Perhaps putting the client in a model to get the getter/setter for free?
  var client = null;
  var setClient = function( newClient ) {
    client = newClient;
  };
  
  var getClient = function() {
    return client;
  };
  
  var feedView = null;
  var setFeedView = function( newFeedView ) {
    feedView = newFeedView;
  };
  
  var getFeedView = function() {
    return feedView;
  };

  return {
      setClient: setClient,
      getClient: getClient,
      setFeedView: setFeedView,
      getFeedView: getFeedView
      
  };
});
