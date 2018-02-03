module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            html: {
                src: 'app/views/boilerplate.ejs',
                dest: 'app/views/boilerplate.min.ejs'
            }
        },
        useminPrepare: {
            html: 'app/views/boilerplate.ejs',
            options: {
                root: 'static/',
                dest: 'static/dist'
            }
        },
        usemin: {
            html: 'app/views/boilerplate.min.ejs',
            options: {
                blockReplacements: {
                    css: function (block) {
                        return '<link rel="stylesheet" href="dist/' + block.dest + '">';
                    },
                    js: function (block) {
                        return '<script src="dist/' + block.dest + '"></script>';
                    }
                }
            }
        },
        clean: {

        }
    });

    grunt.registerTask('default', [
        'copy',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        'clean'
    ]);
};