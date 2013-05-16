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
  'views/Feed',
  'models/config',
  'globals'
], function($, _, Backbone, forcetk, FeedView, Config, Globals){
  var LoginView = Backbone.View.extend({
    loginURL: 'https://login.salesforce.com/',
      
    el: $( '#feed'),
  
    events : {
      'click .fixedLogin'         : 'fixedLogin',
      'click .dynamicLogin'       : 'dynamicLogin'
    },
  
    initialize: function(){
      console.log("An object of LoginView was created");
      // bind to DOM event using jQuery
      //this.$el.click(this.jqueryClicked);  
     },
  
      // 'this' is handling DOM element
    jqueryClicked: function(event) {
      console.log("jQuery handler for " + this.outerHTML);
      this.fixedLogin();
    },  
    
    getAuthorizeUrl : function(loginUrl, clientId, redirectUri){
      return loginUrl+'services/oauth2/authorize?display=touch'
              +'&response_type=token&client_id='+escape(clientId)
              +'&redirect_uri='+escape(redirectUri);
      },

    sessionCallback: function(oauthResponse) {
      if (typeof oauthResponse === 'undefined' || typeof oauthResponse['access_token'] === 'undefined') {
      // TODO: Error Callback
      /*      errorCallback({
                status: 0, 
                statusText: 'Unauthorized', 
                responseText: 'No OAuth response'
            });
            */
      } else {
        Globals.getClient().setSessionToken(oauthResponse.access_token, null, oauthResponse.instance_url);
        // Globals.sf_token = this.client.sessionId;
        var that = this;
        Globals.getClient().ajax('/v27.0/chatter/feeds/news/me/feed-items',
                        function(data){
                          $(that.el).find('.preLogin').hide();  
                          FeedView.update_feed(data);
                        },
                        function(error){
                          console.log(error);
                        },
                        'GET',
                        null,
                        false
                    );
        }
      },
    
    // TODO: fix forcetkClientUILogin
    // Currently unsupported and looks broken
      forcetkClientUILogin: function(loginURL, consumerKey, callbackURL) {
        // Instantiating forcetk ClientUI
        var ftkClientUI = new forcetkui.ClientUI(loginURL, consumerKey, callbackURL,
                    function forceOAuthUI_successHandler(forcetkClient) { // successCallback
                      sf_token = forcetkClient.sessionId;

                        forcetkClient.ajax('/v27.0/chatter/feeds/news/me/feed-items',
                            function(data){
                                FeedView.display_feed(data);
                            },
                            function(error){
                                console.log(error);
                            },
                            'GET',
                            {},
                            false
                        );
                    },

                    function forceOAuthUI_errorHandler(error) { // errorCallback
                        console.log(error);
                    }
                );

        // Initiating login process
        ftkClientUI.login();
    }, 
  
    forcetkClientLogin: function(loginURL, consumerKey, callbackURL) {
      var proxyURL    = callbackURL + 'proxy.php?mode=native';
      this.client = new forcetk.Client(consumerKey, loginURL, proxyURL);
  
      if(this.client.sessionId == null) {
        var oauthResponse = {};
        if (window.location.hash && window.location.href.indexOf('access_token') > 0) {
          var message = window.location.hash.substr(1);
          var nvps = message.split('&');
          for (var nvp in nvps) {
              var parts = nvps[nvp].split('=');
            oauthResponse[parts[0]] = unescape(parts[1]);
          }
          console.log('init app');
          if(oauthResponse['access_token']) {this.sessionCallback(oauthResponse);}
        } else {
          url = this.getAuthorizeUrl(loginURL, Config.get('consumerKey'), Config.get('callbackURL'));
          window.location.href = url;
        }
      }
    },
  
    usernamePasswordLogin : function(loginURL, consumerKey, proxyURL) {
      Globals.setClient( new forcetk.Client(consumerKey, loginURL, proxyURL));
      var proxyLoginURL = proxyURL + '&url=' + escape(loginURL);
      var username = Config.get('userName');
      var password = Config.get('password');
      var consumerSecret = Config.get('consumerSecret');
  
      if(Globals.getClient().sessionId == null) {
        var that = this;
        $.post(proxyLoginURL, 
          { grant_type:'password', 
            client_id:consumerKey, 
            client_secret:consumerSecret, 
            username: username, 
            password: password }, 
          function(data) {
            that.sessionCallback(data)
          }, 
          'json');
      }
    },
  
    dynamicLogin: function() {       
      this.forcetkClientLogin( this.loginURL, Config.get('consumerKey'), Config.get('callbackURL'));
    
    },
    
    fixedLogin : function(){
      console.log("fixedlogin");       
      var proxyURL = Config.get('callbackURL') + 'proxy.php?mode=native';
      this.usernamePasswordLogin( this.loginURL + 'services/oauth2/token', Config.get('consumerKey'), proxyURL);  
    }
    
  });  
  
  return LoginView;
});
