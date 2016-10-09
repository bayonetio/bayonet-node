"use strict";

var _ = require('lodash');
var rq = require('request-promise');
var configuration = {};

module.exports = function () {
    function configure(options) {
        _.assign(
            (configuration = {
                request: {
                    method: 'POST',
                    json: true
                },
                endpoints: {
                    consulting: '/v1/consulting',
                    feedback: '/v1/feedback',
                    feedback_historical: '/v1/feedback-historical'
                }
            }),
            options
        );
    }

    return {
        configure: configure
    };
};