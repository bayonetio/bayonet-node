"use strict";

var _ = require('lodash');
var util = require('util');
var rq = require('request-promise');
var config = null;

module.exports = function () {
    function configure(options) {
        var version = 'v' + options.version;
        _.assign(
            (config = {
                request: {
                    method: 'POST',
                    json: true
                },
                endpoints: {
                    consulting: version + '/consulting',
                    feedback: version + '/feedback',
                    feedback_historical: version + '/feedback-historical'
                }
            }),
            options
        );
    }

    function getConfig() {
        return config;
    }

    function request(endpoint, body) {
        var settings = {
            uri: util.format(
                '%s://%s/%s',
                config.schema,
                config.host,
                endpoint
            ),
            body: _.assign(
                {},
                body,
                { api_key: config.api_key }
            )
        };

        return rq(
            _.assign(
                settings,
                config.request
            )
        );
    }

    function consulting(body) {
        return request(config.endpoints.consulting, body);
    }

    function feedback(body) {
        return request(config.endpoints.feedback, body);
    }

    function feedbackHistorical(body) {
        return request(config.endpoints.feedback_historical, body);
    }

    // run default configuration
    configure(
        require('./configure').default_options
    );

    return {
        configure: configure,
        getConfig: getConfig,
        consulting: consulting,
        feedback: feedback,
        feedbackHistorical: feedbackHistorical
    };
};