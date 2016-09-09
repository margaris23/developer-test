module.exports = {
  options: {
    globals: {
      'angular': false,
      'module': false,
      'inject': false,
      'before': false,
      'beforeEach': false,
      'after': false,
      'afterEach': false,
      'describe': false,
      'expect': false,
      'it': false,
      'xit': false,
      '__dirname':false
    },
    reporter: require('jshint-stylish')
  },

  grunt: {
    files: {
      src:['Gruntfile.js',
           'grunt/*.js']
    }
  },

  clients: {
    files: {
      src:['app/**/*.js', '!app/bower_components/**/*.js']
    }
  }

};

