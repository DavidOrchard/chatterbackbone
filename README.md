### Chatter, Backbone, RequireJS,  + buzzword friends
A demonstration of rendering a Salesforce.com chatter feed using backbone.js, Requirejs, jQuery Mobile and Jasmine.  Displays a feed for the logged in user, renders comments.  Supports like and unlike, posting to users feed.  Source available on github, dev version on my local machine and prod version on Heroku from single code base.  And yes Dorothy, keys, secrets, passwords etc. aren't on github.  It is intended for my experimentation purposes only.  More ideas: 
 - more mobile cowbell (mobile boilerplate, iscroll), 
 - Other toolkits: Foundation, Bootstrap, other grids
 - full desktop/mobile versions,
 - integration with hootsuite dashboard, 
 - delete, like, unlike, bookmark,
 - view more
 - pull to refresh
 - feed types
 - more cowbell, 
 - publisher, 
 - many more jasmine tests
 - perf testing, 
 - app building using phonegap and/or trigger.io, 
 - perf enhancement in js, css compiler, 
 - offline, 
 - secure offline with salesforce.com smartstore. 

[Source on Github](https://github.com/DavidOrchard/chatterbackbone/)

[Web app](https://chatterbackbone.herokuapp.com)

### stuff learned

####Backbone

The model synchronization is really nice, I love events.  I haven't yet figured out how to update just one part of a model in the UI (such as like/unlike change).

Backbone Require Boilerplate is really nice.  I've purposefully re-invented much of it.

having to cache bust to get .js updates is really awful for debugging.  adding debugger; statements then upload each bp is unusable.

As always, security is an afterthought.  The backbone and require examples usually do not deal with auth and there's no canonical way of deal with views/models/etc. on secure sites.  One decent example is [http://dailyjs.com/2012/12/13/backbone-tutorial-3/](http://dailyjs.com/2012/12/13/backbone-tutorial-3/)

Model Chaining/Inheritance of properties requires extra work.  Trying to make Model A and B then C that extends either A or B (ie, config) doesn't work out of the box. C = A.extend({propC:foo}); doesn't show propC in C, and C = A.extend({defaults:{propC:foo}}) blows away A's defaults.  The solution is ConfigModel = ConfigDev.extend({defaults: _.extend({},ConfigDev.prototype.defaults, generalConfig)}).  I think it's broken that extending one model requires a manual extension in each subclass.  It's called EXTENSION people.

####Require
I got into circular dependencies a couple times, such as App depends upon Login which depends upon App, or FeedView depends upon PosterView which depends upon FeedView.  But these were simply solved by introducing a 3rd module (globals in the former), or correctly passing models and then using events in the latter.

require.js behaves randomly on loading a js/newsfeedstatic.js file.  On localhost it loads but on Heroku the reference fails.  I'll load staticly for now

I keep on mixing up the define and name in require.  It's a pain to cut 'n paste a dependency from one file to another.  An array structure might be better, ie ['lib/jquery', 'jquery'],  The error reporting is non-existant, as the code will just not work so you have to put a debug.  Sometimes I miss static typed languages.

####Jasmine
I quite like Jasmine.  Nice and simple.  It caught 2 bugs.  It's awesome when testing tools catch bugs and aren't just overhead.  

Surprisingly immature around creating backbone view events spies. Only 1 upvote on needing to call delegateEvents after registerying a spy. http://stackoverflow.com/questions/7590751/testing-backbone-js-view-events-with-jasmine

####Jasmine and automation
Again, surprisingly immature around CI testing.  I'll look at PhantomJS using https://github.com/jcarver989/phantom-jasmine.  Best article on coverage I found was http://blog.johnryding.com/post/46757192364/javascript-code-coverage-with-phantomjs-jasmine-and

####Deployment
Surprisingly little samples on configuration of dev vs prod

github.com open source, local and heroku deployed is a bit tricky to make sure keys aren't copied to github.  I'm really wanted  [http://cogniton-mind.tumblr.com/post/1423976659/howto-gitignore-for-different-branches](http://cogniton-mind.tumblr.com/post/1423976659/howto-gitignore-for-different-branches).  Then I really wanted [http://stackoverflow.com/questions/3868491/git-ignore-some-files-during-a-merge-keep-some-files-restricted-to-one-branch](http://stackoverflow.com/questions/3868491/git-ignore-some-files-during-a-merge-keep-some-files-restricted-to-one-branch) but that didn't work either.

I had to choose between merging or rebase from heroku.  Merging would always show the merge commit:
github branch contains everything and no config information
heroku branch contains github branch
heroku branch contains a commit for the config information
github branch does a 'git merge -s ours heroku^'
Any further github merges from heroku work as expected.  This may be problematic again if the config is updated again.

Rebase was done by making a conflict in the config, then fixing the conflict.  That didn't work either as the original change would show in github.

Finally a solution!  
git rebase heroku
git rebase --onto <commit before the config> <commit of the config>
then git push github github:master

Now, trying the reverse and rebasing github onto heroku... Works!
But wait, how do you specify the commit?  The rebase creates a new commit in the github branch with a new id.  The solution is to give the commit a well defined message such as 'actual config data', and then use the naming in the rebase --onto, such as
"git rebase --onto HEAD^{'/actual config data'}^ HEAD^{'/actual config data'}"
I suggest combining these two rebase and the push commands into one to make sure you do both.

Modularity and re-use across desktop/mobile is harder than it ought to be.  Adding a /m/index.html and a different main.js as mobile-main.js has the result that the mobile specific code like mobile-main can't be in a separate directory because the js references in main are all off on the dir structure.  Maybe there's a require.js equivalent of base href that can be passed in to a main?

####Salesforce
Despite remote access points and examples, still takes a while

the forcetk UI for doing the auth in a separate window then catching the reload URI seems broken.  For now, I'll do it inline and live with the too lengthy url

modularity with salesforce login is also harder than it ought to be.  Because the oauth redirect uri is hardcoded on the server in oauth2 (oauth_callback in oauth 1.0 is deprecated), you can't have a "/index.html" and a "/m/index.html" for the same endpoint.  Separate remote acces points (yuck), Cookies and/or query params seem to be the solution.  

More on the modularity with SFDC, it would be nice to support a localhost and a heroku deployment of the exact same code, which isn't possible with the hard-coded redirect.

SFDC Oauth docs have a few surprising errors. A password oauth 2.0 example had grant_type="basic-credentials" instead of password at [http://help.salesforce.com/help/doc/en/remoteaccess_oauth_username_password_flow.htm](http://help.salesforce.com/help/doc/en/remoteaccess_oauth_username_password_flow.htm).  I'm pretty sure I saw a V27 password oauth 2.0 example say name=. but it requires username=.

Interesting marketing through the cloudspokes challenges: [http://www.cloudspokes.com/challenges/2125](http://www.cloudspokes.com/challenges/2125)

##### Salesforce Backbone examples

Many examples, perhaps too many.

[http://blogs.developerforce.com/developer-relations/2013/04/build-mobile-web-apps-with-backbone-js-and-the-salesforce-platform.html](http://blogs.developerforce.com/developer-relations/2013/04/build-mobile-web-apps-with-backbone-js-and-the-salesforce-platform.html
)

[http://wiki.developerforce.com/page/Cross-Platform_Mobile_Development_with_Backbone](http://wiki.developerforce.com/page/Cross-Platform_Mobile_Development_with_Backbone
)

[http://www2.developerforce.com/mobile/getting-started/html5#backbone-heroku](http://www2.developerforce.com/mobile/getting-started/html5#backbone-heroku)

[http://wiki.developerforce.com/page/Getting_Started_with_the_Chatter_REST_API](http://www2.developerforce.com/mobile/getting-started/html5#backbone-heroku)

And there's more..

#### Backbone fundamentals book errors
file://localhost/Users/dave/Documents/ExtPresosSamples/backbone-fundamentals/index.html#view-testing
shows spyOnEvent($('#el'), 'click'); and should be spyOnEvent('#el', 'click');

