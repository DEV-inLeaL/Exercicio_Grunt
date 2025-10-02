module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development: {
                files:{
                    './dist/styles/main.css': './src/styles/main.less'
                }
            },
            production: {
                options:{
                    compress: true,
                },
            files:{
                './produc/main.min.css': './src/styles/main.less'
            }
            }
        },
        replace: {
            dev:{
                options:{
                    patterns: [
                        {
                            match: 'endereco_do_css',
                            replacement: '../dist/styles/main.css'
                        },
                        {
                            match: 'endereco_do_js',
                            replacement: '../dist//main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['./src/index.html'],
                        dest: 'dist'
                    }
                ]
            },
            dist:{
                options:{
                    patterns: [
                        {
                            match: 'endereco_do_css',
                            replacement: '../produc/main.min.css'
                        },
                        {
                            match: 'endereco_do_js',
                            replacement: '../dist/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['./prebuild/index.html'],
                        dest: 'produc'
                    }
                ]
            }
        },
        htmlmin: {
            dist:{
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files:{
                    './prebuild/index.html': './src/index.html'
                }
            }
        },
        uglify:{
            target:{
                files:{
                    './dist/main.min.js': './src/*.js'
                }
            
            }
        }
    })
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less', 'htmlmin', 'replace', 'uglify']);
};
