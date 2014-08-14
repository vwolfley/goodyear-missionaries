module.exports = function(grunt){

    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        bannercss: '/*!\n' +
            '*@concat.min.css\n' +
            '*@CSS Document for \n' +
            '*@For Production\n' +
            '*@<%= pkg.name %> - v<%= pkg.version %> | <%= grunt.template.today("mm-dd-yyyy") %>\n' +
            '*@author <%= pkg.author %>\n' +
        '*/\n',

        bannerjs: '/*!\n' +
            '*@min.js\n' +
            '*@JS Document for \n' +
            '*@For Production\n' +
            '*@<%= pkg.name %> - v<%= pkg.version %> | <%= grunt.template.today("mm-dd-yyyy") %>\n' +
            '*@author <%= pkg.author %>\n' +
        '*/\n',

        jshint: {
                options: {
                    // strict: true,
                    sub: true,
                    quotmark: "double",
                    trailing: true,
                    curly: true,
                    eqeqeq: true,
                    unused: true,
                    scripturl: true,    // This option defines globals exposed by the Dojo Toolkit.
                    dojo: true,         // This option defines globals exposed by the jQuery JavaScript library.
                    jquery: true,       // Set force to true to report JSHint errors but not fail the task.
                    force: true,
                    reporter: require("jshint-stylish-ex")
                },
                files: {
                    src : ['js/main.js']
                }
        },

        uglify: {
            options: {
                // add banner to top of output file
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - main.js | <%= grunt.template.today("mm-dd-yyyy") %> */\n'
            },
            build: {
                files: {
                    "js/main.min.js": ["js/main.js"]
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                // add banner to top of output file
                    banner: '/* <%= pkg.name %> - v<%= pkg.version %> | <%= grunt.template.today("mm-dd-yyyy") %> */'
                },
                files: {
                    "css/main.min.css": ["css/main.css"],
                    "css/normalize.min.css": ["css/normalize.css"]
                }
            }
        },

        concat: {
            options: {
              stripBanners: true,
              bannercss: '<%= banner %>'
            },
            target: {
              src: ["css/normalize.min.css", "css/main.min.css"],
              dest: 'css/concat.min.css'
            }
        },

        watch: {
            js: {
                files: ['assets/js/base.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['assets/sass/**/*.scss'],
                tasks: ['buildcss']
            }
        }

    });

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('prod', ['uglify', 'cssmin', 'concat']);

};

//ref
// http://coding.smashingmagazine.com/2013/10/29/get-up-running-grunt/
// http://csslint.net/about.html
// http://www.jshint.com/docs/options/
