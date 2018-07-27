module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var pkgJson = require('./package.json');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.initConfig({
    clean: ["dist"],

    copy: {
      dist_js: {
        expand: true,
        cwd: 'src',
        src: ['**/*.js'],
        dest: 'dist'
      },
      dist_html: {
        expand: true,
        flatten: true,
        cwd: 'src',
        src: ['*.html'],
        dest: 'dist'
      },
      dist_css: {
        expand: true,
        flatten: true,
        cwd: 'src/css',
        src: ['*.css'],
        dest: 'dist/css/'
      },
      dist_img: {
        expand: true,
        flatten: true,
        cwd: 'src/img',
        src: ['*.*'],
        dest: 'dist/img/'
      },
      dist_statics: {
        expand: true,
        flatten: true,
        src: ['plugin.json', 'LICENSE.md', 'README.md'],
        dest: 'dist/'
      }
    },

    ts: {
      default: {
	tsconfig: true
      }
    },
    'string-replace': {
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ["**/plugin.json"],
          dest: 'dist'
        }],
        options: {
          replacements: [{
            pattern: '%VERSION%',
            replacement: pkgJson.version
          },{
            pattern: '%TODAY%',
            replacement: '<%= grunt.template.today("yyyy-mm-dd") %>'
          }]
        }
      }
    },
    watch: {
      files: ['src/**/*.ts', 'src/**/*.html', 'src/**/*.css', 'src/img/*.*', 'src/plugin.json', 'README.md'],
      tasks: ['default'],
      options: {
        debounceDelay: 250,
      },
    }

  });

  grunt.registerTask('default', [
    'clean',
    'ts',
    'copy:dist_js',
    'copy:dist_html',
    'copy:dist_css',
    'copy:dist_img',
    'copy:dist_statics',
    'string-replace'
  ]);
};
