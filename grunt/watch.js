module.exports = {
    less: {
      files: ['app/**/*.less'],
      tasks: ['less'],
    },
    test: {
        files: ['app/**/*.js'],
        tasks: ['test'],
    },
    karma: {
        files: ['app/**/*.js'],
        tasks: ['karma:unit']
    }
};