/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define(function(require){
  'use strict';
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    FeedItemTemplate = require('text!templates/FeedItem.html'),
    Globals = require('globals'),
    FeedItemCommentModel = require('models/FeedItemComment'),
    FeedItemCommentView = require('views/FeedItemComment');
    
  var FeedItemView = Backbone.View.extend({
    events : {
      'click .feeditemlikelink'         : 'like',
      'click .feeditemunlikelink'       : 'unlike',
      'click .feeditemdeletelink'       : 'delete'
    },
    
    template: _.template( FeedItemTemplate),

    initialize: function(){
      this.model.on('change', _.bind(this.render, this));
    },  
    
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
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
      var url = this.model.get('url') + '/likes';
      var that = this;
      Globals.getClient().ajax(url,
          function(data){
            that.model.set('myLike', {id:data.id, url:data.url});
            that.model.set('isLikedByCurrentUser', true);
          },
          function(error){
            console.log(error);
          },
          'POST',
          {},
          false
      );
    },
    
    unlike: function() {
      var url = this.model.get('myLike')['url'];
      var that = this;
      Globals.getClient().ajax(url,
           function(data){
             that.model.set('isLikedByCurrentUser', false);
             that.model.set('myLike', {});
            },
           function(error){
             console.log(error);
           },
           'DELETE',
           {},
           false
       );
    },
    
    delete: function() {
      alert("delete");
    }
  });
 
  return FeedItemView;
});
