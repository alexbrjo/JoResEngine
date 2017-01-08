module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            engine: {
                src: [ 'build/engine/**/*.js' ],
                dest: 'dist/JoResEngine.js'
            },
            gameCreator: {
                src: [ 'build/GameCreator/**/*.js' ],
                dest: 'dist/JoResGameCreator.js'
            }
        },
        copy:{
            build:{
                cwd: 'src',
                src: [ '**' ],
                dest: 'build',
                expand: true
            },
            test:{
                cwd: 'dist',
                src: [ 'JoRes*.js' ],
                dest: 'test',
                expand: true
            },
            example:{
                cwd: 'dist',
                src: [ 'JoResEngine*.js' ],
                dest: 'sample',
                expand: true
            },
            html:{
                cwd: 'build/GameCreator',
                src: [ '*.html', '*.css', '*.png' ],
                dest: 'dist',
                expand: true
            }
        },
        clean:{
            build:{
                src: 'build'
            },
            test:{
                src: 'JoRes*'
            }
        },
        uglify: {
            engine: {
                files: {
                    'dist/JoResEngine.min.js': [ 'dist/JoResEngine.js' ]
                }
            },
            gameCreator: {
                files: {
                    'dist/JoResGameCreator.min.js': [ 'dist/JoResGameCreator.js' ]
                }
            }
        },
        /**
         * Tests are currently running headless and therefore a complete 
         * instance of the app shouldn't be created
         */ 
        jasmine : {
            src : ['src/**/*.js', '!src/App.js'],
                options : {
                    specs : 'test/**/*.test.js'
                }
            }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask(
        'build', 
        'builds the engine and game creator', 
        ['build-engine', 'build-game-creator']
    );
    grunt.registerTask(
        'build-engine', 
        'cleans, copys to build folder and uglifies', 
        ['clean', 'copy:build', 'concat:engine', 'uglify:engine', 'copy:test', 'copy:example']
    );
    grunt.registerTask(
        'build-game-creator', 
        'cleans, copys to build folder and uglifies', 
        ['clean', 'copy:build', 'concat:gameCreator', 'uglify:gameCreator', 'copy:html']
    );
};
