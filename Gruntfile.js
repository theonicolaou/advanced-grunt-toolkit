module.exports = function (grunt) {
// load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);
    
		grunt.initConfig({
			//TODO: Run grunt-bower-install-simple to ensure all dependencies are up to date

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
			// TODO: install and copy fontawesome.css and lt-ie-9 dependencies
			
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
    		},
    		options: {
    			destPrefix: 'app/css/vendor'
    		},
  		}
		},
			
		//Use usemin to concat and minify css and js dependencies
		
		//TODO: Concatenate js/vendor/*.js files into app.js
		//TODO: Concatenate css/vendor/foundation.css + styles.css into app.css
		concat: {
  			css: {
    			src: ['app/css/vendor/*.css','app/css/*.css'],
    			dest: 'app/css/app.css'
  			},
  			
  			js: {
  				src: ['app/js/vendor/*.js'],
  				dest: 'app/js/app/js'
  			}
			},
			  		
  });
  
	grunt.registerTask('develop', ['sass','bowercopy']);
	grunt.registerTask('concat', ['concat:css','concat:js']);
};