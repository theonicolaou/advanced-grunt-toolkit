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

	//Compile Foundation SCSS and custom styles SCSS files into CSS
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
	},

	//lint main custom CSS file.
	csslint: {
		strict: {
			src: ['app/css/styles.css']
		}
	},
	
	autoprefixer: {
		options: {
			browsers: ['last 3 versions', 'ie 9', 'ie 8']
		},
		
		dist: {
			files: {
				'app/css/styles.css': 'app/css/styles.css'
			}
		}
	},

	//watch for changes to SCSS files.
	watch: {
		sass: {
			files: ['app/scss/*.scss'],
			tasks: ['sass'],
			
			options: {
				livereload: 35729
			}
		},

		html: {
			files: ['app/*.html'],
			options: {
				livereload: 35729
			}
		}
	},

	connect: {
		dev: {
			options: {
				port: 8888,
				hostname: 'localhost',
				livereload: 35729,
				open: true,
				base: 'app/',
			},
		},

		dist: {
			options: {
				port: 9000,
				hostname: 'localhost',
				open: true,
				keepalive: true,
				base: 'dist/'
			}
		}
	},

	//configurations for OS X notifications, for each task.
	notify: {
		clean: {
			options: {
				title: "Clean",
				message: "Files cleaned",
				success: true,
				duration: 5	
			}
		},

		"bower-install-simple": {
			options: {
				title: "Install Bower dependencies",
				message: "Bower dependencies installed/updated",
				success: true,
				duration: 5	
			}
		},

		bowercopy: {
			options: {
				title: "Copy Bower dependencies",
				message: "Bower dependencies copied",
				success: true,
				duration: 5	
			}
		},

		sass: {
			options: {
				title: "SCSS Compilation",
				message: "SCSS compilation complete",
				success: true,
				duration: 5	
			}
		},

		copy: {
			options: {
				title: "Copy files to Dist",
				message: "Files copied to /dist folder",
				success: true,
				duration: 5	
			}
		},

		concatcss: {
			options: {
				title: "CSS file concatenation",
				message: "CSS files concatenated",
				success: true,
				duration: 5
			}
		},

		concatjs: {
			options: {
				title: "JS file concatenation",
				message: "JS files concatenated",
				success: true,
				duration: 5
			}
		},

		cssmin: {
			options: {
				title: "CSS file minification",
				message: "CSS files minified",
				success: true,
				duration: 5
			}
		},

		uglify: {
			options: {
				title: "JS file minification",
				message: "JS files minified",
				success: true,
				duration: 5
			}
		},

		usemin: {
			options: {
				title: "usemin tasks",
				message: "File paths updated with usemin",
				success: true,
				duration: 5
			}
		},

		csslint: {
			options: {
				title: "CSS Lint",
				message: "CSS lint complete",
				success: true,
				duration: 5
			}
		},

		autoprefixer: {
			options: {
				title: "Autoprefixer",
				message: "Vendor prefixes added to CSS files",
				success: true,
				duration: 5	
			}
		},
	},
});

	//TODO: grunt develop should be clean, bowercopy, sass, watch, autoprefixer
	//TODO: grunt bowercopy should be clean, (+ ideally bower install), bowercopy
	//TODO: grunt build should be clean, (+ ideally bower install), sass, autoprefixer, bowercopy, usemin
	
	//TODO: make config dynamic
	//TODO: set up final Grunt tasks
	//TODO: update README
	//TODO: add image optimisations

	grunt.registerTask('cleanit', ['clean', 'notify:clean']);
	grunt.registerTask('develop', ['sass','notify:sass','connect:dev','watch']);
	grunt.registerTask('build', ['clean', 'notify:clean','bower-install-simple','notify:bower-install-simple','sass','notify:sass','bowercopy','notify:bowercopy',
		'copy','autoprefixer','notify:autoprefixer','concat:css','notify:concatcss','concat:js','notify:concatjs','cssmin','notify:cssmin',
		'uglify','notify:uglify',		'useminPrepare','usemin','notify:usemin','connect:dist']);
	grunt.registerTask('prefixcss', ['autoprefixer','notify:autoprefixer']);
	grunt.registerTask('lintcss', ['csslint','notify:csslint']);
	grunt.registerTask('serve', ['connect:dev']);
	grunt.registerTask('watchit', ['watch']);
};