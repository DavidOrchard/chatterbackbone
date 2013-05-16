/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define([
  'jquery', 
  'underscore',
  'backbone',
  'forcetk',
  'collections/FeedItemsCollection',
  'views/FeedItemsCollection',
  'views/FeedItemPoster' /*,
  'newsfeedstatic'*/
], function($, _, Backbone, forcetk, FeedItemsCollection, FeedItemsCollectionView, FeedItemPosterView/*, NewsFeedStatic*/){
  var FeedView = Backbone.View.extend({
  
    el: $( '#feedContainer'),  
  
    initialize: function(){
      console.log("An object of FeedView was created");
      this.model.on('reset', _.bind(this.render, this));
      this.model.on('add', _.bind(this.render, this));
      this.render();
    },  
  
    render : function () {
      this.feed_view = new FeedItemsCollectionView({
          collection: this.model,
      });
    
    },
  
    update_feed : function(feed_items){
      this.model.reset(feed_items['items']);
      this.poster = new FeedItemPosterView({feedmodel:this.model});
    }
  });
  
  var feedModel = new FeedItemsCollection(news_feed_data['items']); 
  
  return new FeedView({model:feedModel});
});
