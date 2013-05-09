/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define([
  'jquery', 
  'underscore',
  'backbone',
  'views/FeedItem',
  'text!templates/FeedItemsCollection.html'
], function($, _, Backbone, FeedItemView, FeedItemCollectionTemplate){
  var FeedItemsCollectionView = Backbone.View.extend({
    el: '#feed-items-collection',
    tagName: 'ul',
    template: _.template( FeedItemCollectionTemplate),
    
    initialize: function(){
        //Render Views
        this.render();
    },
    
    render: function() {
        this.$el.html(this.template());
        this.render_feed_items();
        return this;
    },
    
    render_feed_items: function() {       
      _.each(this.collection.models, function (item) {
          feed_item_view = new FeedItemView({
              model: item
          });
          this.$('#feed-items-collection-placeholder').append(feed_item_view.render().el);
      }, this);
    }
  });

  return FeedItemsCollectionView;
});
