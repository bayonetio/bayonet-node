"use strict";

var _ = require('lodash');
var configuration = require('./configure');
var api = require('./api')();

module.exports = function () {
  function configure(options) {
    if (!options) {
      throw Error('You need to add an API key');
    } else {
      api.configure(
        _.assign(
          {},
          configuration.default_options,
          options
        )
      );
    }
  }

  return {
    configure: configure,
    api: api
  };
};
