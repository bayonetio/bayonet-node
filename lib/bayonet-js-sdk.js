"use strict";

var _ = require('lodash');
var configuration = require('./configure');
var api = require('./api')();

module.exports = function () {
    function configure(options) {
        if(!('version' in options)) {
            throw Error('You need to specify a Bayonet API version.');
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