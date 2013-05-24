/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// Put all the requires here for easy cut 'n paste in other files
define(function(require) {
    var $ = require('jquery'),
      _ = require('underscore'),
      Backbone = require('backbone'),
      forcetk = require('forcetk'),
      Globals = require('globals'),
      Client = require('client'),
      Config = require('models/config');
      FeedItemModel = require('models/FeedItem'),
      FeedItemCommentModel = require('models/FeedItemComment'),
      FeedItemsCollection = require('collections/FeedItemsCollection'),
      MobileRouter = require('routers/mobileRouter'),
      FeedView = require('views/Feed'),
      FeedItemView = require('views/FeedItem'),
      FeedItemCommentView = require('views/FeedItemComment'),      
      FeedItemsCollectionView = require('views/FeedItemsCollection'),
      FeedItemPosterView = require('views/FeedItemPoster'),
      news_feed_data = require('newsfeedstatic'),
      LoginView = require('views/Login');
          
  var initialize = function(){
    var loginView = new LoginView();
    var feedModel = new FeedItemsCollection(news_feed_data['items']); 

    Globals.setFeedView( new FeedView({model:feedModel})) ;
  };
  
  return {
      initialize: initialize
  };
});
