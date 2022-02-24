module.exports = function (grunt) {
  const sass = require('node-sass');
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jsDir: 'assets/src/js/',
    jsDistDir: 'assets/dist/js/',
    cssDir: 'assets/src/css/',
    cssDistDir: 'assets/dist/css/',
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
        sourceComments: false,
        outputStyle: 'compressed',
      },
      dist: {
        files: {
          'assets/dist/css/styles.css': 'assets/src/scss/styles.scss',
        },
      },
    },
    concat: {
      js: {
        options: { separator: ';\n' },
        src: [
          'node_modules/jquery/dist/jquery.min.js',
          'node_modules/nprogress/nprogress.js',
          'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
          'node_modules/datatables.net/js/jquery.dataTables.min.js',
          'node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
          'node_modules/datatables.net-responsive/js/dataTables.responsive.min.js',
          'node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js',
          'node_modules/chart.js/dist/chart.min.js',
          'assets/src/js/script.js',
        ],
        dest: '<%=jsDistDir%>scripts.js',
      },
    },
    watch: {
      files: ['<%=jsDir%>*.js', '<%=cssDir%>*.css'],
      tasks: ['sass', 'concat'],
    },
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['sass', 'concat', 'watch']);
  grunt.registerTask('build', ['sass', 'concat']);
};
