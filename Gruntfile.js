module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    shell: {
          'git-add-dist': {
            command: 'git add '
          },
          'git-commit-build': {
            command: 'git commit -am"build"'
          },
          'heroku': {
                command: 'git mv package.json package.json2; git add .; git commit -m "move package.json" --no-edit; git push heroku heroku2:master; heroku ps:scale web=1; git reset HEAD~1 --hard'
              },
          'github': {
                command: 'git rebase --onto HEAD^{\'/actual config data\'}^ HEAD^{\'/actual config data\'};git push github github2:master;'
          }
              
        },
    jshint: {
      all: [
        'Gruntfile.js',
        'js/*.js',
        'js/collections/**/*.js',
        'js/models/**/*.js',
        'js/routers/**/*.js',
        'js/templates/**/*.js',
        'js/test/**/*.js',
        'js/views/**/*.js',
       ],
     },
    jasmine : {
      src : 'js/**/*.js',
      options : {
        specs : 'js/test/specs/spec.js',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: 'js/mobile-main.js'
        }      
      }
    },
    requirejs: {
      production: {
        options: {
          baseUrl: "js",
          mainConfigFile: "js/mobile-main.js",
          out: "build/chatterbackbone-require-min.js"
        }
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['js/**/*.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', ['jshint', 'jasmine']);
//  grunt.registerTask('test', ['jasmine']);
//  grunt.registerTask('jshint', ['jshint']);

  // Default task(s).
  grunt.registerTask('default', ['test']);
//  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('heroku', ['shell:heroku']);
  grunt.registerTask('github', ['shell:github']);
};