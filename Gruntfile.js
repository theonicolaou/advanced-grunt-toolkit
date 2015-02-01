module.exports = function (grunt) {
// load all grunt tasks matching the `grunt-*` pattern
		require('load-grunt-tasks')(grunt);

		grunt.initConfig({
			//clean main compiled css file and minified version.
  		clean: {
    		css: ['app/css/vendor', 'dist/css'],
    		js: ['app/js/vendor', 'dist/js'],
    		html: ['dist/*.html']
			},
			//Run grunt-bower-install-simple to ensure all dependencies are up to date (OR manually run bower update in command line)
			"bower-install-simple": {
				options: {
					color: true,
					directory: "bower_components"
				}
			},

			//Compile Foundation SCSS into CSS
			sass: {
				dist: {
					files: {
						'bower_components/foundation/css/foundation.css': 'bower_components/foundation/scss/app.scss',
						'app/css/styles.css': 'app/scss/app.scss',
					},
				}
			},
			
			//Copy specific bower_components files that will be needed, into app folder:
			bowercopy: {
				options: {
					srcPrefix: 'bower_components/'
				},
				scripts: {
					files: {
						'jquery.js': 'jquery/dist/jquery.js',
						'foundation.js': 'foundation/js/foundation.js',
					},
				options: {
					destPrefix: 'app/js/vendor'
				},
			},
			
			styles: {
				files: {
					'foundation.css': 'foundation/css/foundation.css',
					'font-awesome.css': 'fontawesome/css/font-awesome.css',
				},
				options: {
					destPrefix: 'app/css/vendor'
				},
			},

			fonts: {
				files: {
					'/fonts': '/fontawesome/fonts/',
				},
				options: {
					destPrefix: 'app/'
				},
			}
		},

		//Use usemin to concat and minify css and js dependencies.
		useminPrepare: {
			html: 'app/*.html',
			options: {
				dest: 'dist/index.html',
			}
		},
		
		concat: {
			//Concatenate css/vendor/foundation.css + styles.css into app.css.
			css: {
				src: ['app/css/vendor/*.css','app/css/*.css'],
				dest: 'dist/css/app.css'
			},
			//Concatenate js/vendor/*.js files into app.js.
			js: {
				src: ['app/js/vendor/*.js'],
				dest: 'dist/js/app.js'
			}
		},
		
		//Minify css in dist/css folder
		cssmin: {
  		target: {
    		files: [{
    		expand: true,
      		cwd: 'dist/css',
      		src: ['*.css', '!*.min.css'],
      		dest: 'dist/css',
      		ext: '.min.css'
    		}]
  		}
		},
		
		//Minify js in dist/js folder
		uglify: {
    	my_target: {
      	files: [{
      		expand: true,
      		cwd: 'dist/js',
      		src: ['*.js', '!*.min.js'],
      		dest: 'dist/js',
      		ext: '.min.js'
      	}]
      }
    },

		usemin: {
			html: 'dist/index.html',
			css: 'dist/css/app.css',
			js: 'dist/js/app.js'
		},

		copy:{
			html: {
				src: 'app/index.html',
				dest: 'dist/index.html'
			}
		}
	});

	//TODO: grunt develop should be clean, bowercopy, sass, watch, autoprefixer
	//TODO: grunt bowercopy should be clean, (+ ideally bower install), bowercopy
	//TODO: grunt build should be clean, (+ ideally bower install), sass, autoprefixer, bowercopy, usemin
	
	//TODO: install and copy fontawesome.css and lt-ie-9 dependencies
	//TODO: add in CSSlint
	//TODO: add image optimisations
	//TODO: add notifications
	//TODO: add Autoprefixer
	//TODO: make config dynamic
	//TODO: add LiveReload

	grunt.registerTask('cleanit', ['clean'])
	grunt.registerTask('develop', ['sass','bowercopy']);
	grunt.registerTask('bower-install', ['bower-install-simple']);
	grunt.registerTask('bower-copy', ['bowercopy']);
	grunt.registerTask('copyToDist', ['copy']);
	grunt.registerTask('concatcss', ['concat:css']);
	grunt.registerTask('concatjs', ['concat:js']);
	grunt.registerTask('minifycss', ['cssmin']);
	grunt.registerTask('minifyjs', ['uglify']);
	grunt.registerTask('useMin', ['useminPrepare','usemin']);
};