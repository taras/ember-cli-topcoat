module.exports = function(grunt){

	grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },
    shell: {
      dist: {
        command: 'DIST=true ./node_modules/.bin/ember build dist --env=production'
      }
    }
  });

  grunt.task.registerTask('dist', [
    'shell:dist',
    'gh-pages'
  ]);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-bump');
};
