/* jshint node:true */
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/jquery-ui/jquery-ui.js');
  app.import('bower_components/d3/d3.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/ace-builds/src/ace.js');

  app.import('bower_components/jquery-ui/themes/smoothness/jquery-ui.css');

  return app.toTree();
};
