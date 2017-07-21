var shim = require('browserify-shim');
module.exports = function(grunt) {
  // display execution time of grunt tasks
  require('time-grunt')(grunt);
  // load grunt plugins
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    // aws: grunt.file.readJSON('aws.json'),
    // pkg: grunt.file.readJSON('package.json'),

    // clean source
    clean: {
      options: {
        force: true
      },
        source: {
          src: ['/media/storage/data/www/sites/theneutralzone']
        }
    },

    // enviornmental variables
    //env: {
    //    dev: {
    //        ENV_MODE: 'development'
    //    },
    //    build: {
    //        ENV_MODE: 'production'
    //    }
    //},

    // copy js
    bowercopy: {
      options: {
        srcPrefix: 'bower_components'
      },
      source: {
        options: {
          destPrefix: 'assets/js'
        },
          files: {
            'modernizr.js': 'modernizr/modernizr.js',
            'jquery.js': 'jquery/dist/jquery.js',
            'fastclick.js': 'fastclick/lib/fastclick.js',
            'foundation.js': 'foundation/js/foundation.js',
          }
        }
      },

    // compile scss to css
    compass: {
      build: {
        options: {
          sassDir: 'assets/scss',
          cssDir: 'assets/css',
          importPath: 'bower_components/foundation/scss'
        }
      }
    },

    // concatenate
    concat: {
      options: {
        separator: ';'
      },
        build: {
          src: [
            'assets/js/jquery.js',
            'assets/js/fastclick.js',
            'assets/js/foundation.js'
          ],
          dest: 'assets/js/app.min.js'
        }
    },

    // minify css
    cssmin: {
      build: {
        src: 'assets/css/main.css',
        dest: 'assets/css/main.min.css'
      }
    },

    // minify js
    uglify: {
      build: {
        files: {
          'assets/js/app.min.js': ['<%= concat.build.dest %>']
        }
      }
    },

    // shell commands
    shell: {
      build: {
        command: 'jekyll build --source /media/storage/workspace/theneutralzone --destination /media/storage/data/www/sites/theneutralzone'
      }
    },

    // create local server
    //connect: {
    //    server: {
    //        options: {
    //            livereload: true,
    //            base: '/media/storage/data/www/sites/theneutralzone/',
    //            port: 4000,
    //        }
    //    }
    //},

    // open site in browser
    //open: {
    //    browser: {
    //        path: 'http://localhost:<%= connect.server.options.port %>/'
    //    }
    //},

    // watch files for changes
    watch: {
      options: {
        livereload: true
      },
        sass: {
          files: ['assets/scss/*.scss'],
            tasks: ['compass']
        },
        js: {
          files: ['assets/js/*.js']
        },
        source: {
          files: [
            '*.html',
            '*.yml',
            'assets/scss/*.scss',
            'assets/css/*.css',
            'assets/fonts/*.{woff, eot, ttf, otf, svg}',
            'assets/img/*.{jpg, png}',
            '_includes/**',
            '_layouts/**',
            '_posts/**',
            'penalties/**/**',
            'posts/**/**'
          ],
          tasks: ['shell:build']
        }
      },

      surge: {
        'The Neutral Zone': {
          options: {
            project: '/media/storage/data/www/sites/theneutralzone/',
            domain: 'theneutral.zone'
          }
        }
      }
    });

  grunt.registerTask('serve', ['watch']);
  grunt.registerTask('build', ['clean:source', 'bowercopy', 'compass', 'concat', 'cssmin', 'uglify']);
  grunt.registerTask('deploy', ['surge']);
  grunt.registerTask('default', ['serve']);
};
