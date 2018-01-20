module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower_concat: {
            all: {
                dest: './static/tmp/_bower.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    './static/dist/script.min.js': [
                        './static/tmp/_bower.js',
                        './static/js/script.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: './app/views/boilerplate.ejs',
            options: {
                dest: './app/views/bo'
            }
        },
        usemin: {
            html: 'static/build/app.html'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('default', [
        'useminPrepare',
        'bower_concat',
        'uglify',
        'usemin'
    ]);
};