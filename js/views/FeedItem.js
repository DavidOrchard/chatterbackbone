/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define([
  'underscore',
  'backbone',
  'views/FeedItemComment',
  'models/FeedItemComment',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/FeedItem.html'
], function(_, Backbone, FeedItemCommentView, FeedItemCommentModel, FeedItemTemplate){
  'use strict';
  var FeedItemView = Backbone.View.extend({
    events : {
      'click .like'         : 'like',
      'click .unlike'       : 'unlike',
      'click .delete'       : 'delete'
    },
    
    template: _.template( FeedItemTemplate),

    render: function(){
      this.$el.append(this.template(this.model.toJSON()));
      _.each(this.model.get('comments')['comments'], function (item) {
        console.log("got a comment");
        var feed_comment_view = new FeedItemCommentView({
            model: new FeedItemCommentModel(item)
        });
        this.$('#feed-item-comments-placeholder').append(feed_comment_view.render().el);
      }, this);
    return this;
    },
    
    like: function() {

    },
    
    unlike: function() {
      
    },
    
    delete: function() {
      
    }
  });
 
  return FeedItemView;
});
