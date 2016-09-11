module.exports = {
  compile: {
    options: {
        path: 'app/less'
    },
    files: {
      'app/css/styles.css': [
        'app/less/styles.less',
        'app/components/**/styles/*.less'
      ]
    }
  }
};
