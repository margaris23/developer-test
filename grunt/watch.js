module.exports = {
    less: {
      files: ['app/**/*.less'],
      tasks: ['less'],
    },
    karma: {
        files: ['app/**/*.js'],
        tasks: ['jshint', 'karma:unit']
    }
};