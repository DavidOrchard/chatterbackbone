### Chatter, Backbone, RequireJS,  + buzzword friends
A demonstration of rendering a Salesforce.com chatter feed using backbone.js, Requirejs, jQuery Mobile and Jasmine.  Displays a feed for the logged in user, renders comments.  Supports like and unlike.  Source available on github, dev version on my local machine and prod version on Heroku from single code base.  And yes Dorothy, keys, secrets, passwords etc. aren't on github.  It is intended for my experimentation purposes only.  More ideas: 
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

Backbone Require Boilerplate is really nice.  I've purposefully re-invented much of it.

having to cache bust to get .js updates is really awful for debugging.  adding debugger; statements then upload each bp is unusable.

As always, security is an afterthought.  The backbone and require examples usually do not deal with auth and there's no canonical way of deal with views/models/etc. on secure sites.  One decent example is [http://dailyjs.com/2012/12/13/backbone-tutorial-3/](http://dailyjs.com/2012/12/13/backbone-tutorial-3/)

Model Chaining/Inheritance of properties requires extra work.  Trying to make Model A and B then C that extends either A or B (ie, config) doesn't work out of the box. C = A.extend({propC:foo}); doesn't show propC in C, and C = A.extend({defaults:{propC:foo}}) blows away A's defaults.  The solution is ConfigModel = ConfigDev.extend({defaults: _.extend({},ConfigDev.prototype.defaults, generalConfig)}).  I think it's broken that extending one model requires a manual extension in each subclass.  It's called EXTENSION people.

####Require
require.js behaves randomly on loading a js/newsfeedstatic.js file.  On localhost it loads but on Heroku the reference fails.  I'll load staticly for now

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
I suggest combining these two rebase commands into one to make sure you do both.

Modularity and re-use across desktop/mobile is harder than it ought to be.  Adding a /m/index.html and a different main.js as mobile-main.js has the result that the mobile specific code like mobile-main can't be in a separate directory because the js references in main are all off on the dir structure.  Maybe there's a require.js equivalent of base href that can be passed in to a main?

####Salesforce
Despite remote access points and examples, still takes a while

Many examples, perhaps too many.

the forcetk UI for doing the auth in a separate window then catching the reload URI seems broken.  For now, I'll do it inline and live with the too lengthy url

modularity with salesforce login is also harder than it ought to be.  Because the oauth redirect uri is hardcoded on the server in oauth2 (oauth_callback in oauth 1.0 is deprecated), you can't have a "/index.html" and a "/m/index.html" for the same endpoint.  Separate remote acces points (yuck), Cookies and/or query params seem to be the solution.  

More on the modularity with SFDC, it would be nice to support a localhost and a heroku deployment of the exact same code, which isn't possible with the hard-coded redirect.

SFDC Oauth docs are a bit of mess. A password oauth 2.0 example had grant_type="basic-credentials" instead of password at [http://help.salesforce.com/help/doc/en/remoteaccess_oauth_username_password_flow.htm](http://help.salesforce.com/help/doc/en/remoteaccess_oauth_username_password_flow.htm).  I'm pretty sure I saw a V27 password oauth 2.0 example say name=. but it requires username=.

##### Salesforce examples
http://wiki.developerforce.com/page/Getting_Started_with_the_Chatter_REST_API
