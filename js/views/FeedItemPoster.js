/*Copyright (C) 2013 David Orchard

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

define([
  'jquery',
  'underscore',
  'backbone',
  'globals',
  'text!templates/FeedItemPoster.html'
], function($, _, Backbone, Globals, FeedItemPosterTemplate){
  var FeedItemPosterView = Backbone.View.extend({
    events : {
      'click .postersharebutton'         : 'post'
    },
    
    el: '#feed-poster',  
    
      template: _.template(FeedItemPosterTemplate),

      initialize: function(){
        this.render();
      },
        
      render: function() {
        this.$el.html(this.template()).trigger("create");
        return this;
      },
      post: function() {
        var that = this;
        Globals.getClient().ajax('/v27.0/chatter/feeds/news/me/feed-items',
                         function(data){
                           $(that.$el).find(".postertextarea")[0].value = "";
                           that.options.feedmodel.unshift(data);
                         },
                         function(error){
                           console.log(error);
                         },
                         'POST',
                         JSON.stringify({ "body" : 
                            { 
                               "messageSegments" : [ 
                                  { 
                                    "type": "Text", 
                                    "text" : $(this.$el).find(".postertextarea")[0].value 
                                  }
                               ]
                             }
                         }),
                         false
                     );
       }
      
  });
  
  return FeedItemPosterView
});