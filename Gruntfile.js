module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower_concat: {
            all: {
                dest: './static/tmp/_bower.js'
            }
        },
        useminPrepare: {
            html: './app/views/boilerplate.ejs',
            options: {
                dest: './static/dist'
            }
        },
        usemin: {
            html: './app/views/boilerplate.min.ejs'
        }
    });

    grunt.registerTask('default', [
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin'
    ]);
};