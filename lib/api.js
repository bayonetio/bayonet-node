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
                    feedback_historical: version + '/feedback-historical',
                    get_fingerprint_data: version + '/get-fingerprint-data'
                }
            }),
            options
        );
    }

    function getConfig() {
        return config;
    }

    function request(endpoint, body) {
        var curr_host = config.host;
        if (endpoint === config.endpoints.get_fingerprint_data) {
            curr_host = config.host_fingerprinting;
        }
        var settings = {
            uri: util.format(
                '%s://%s/%s',
                config.schema,
                curr_host,
                endpoint
            ),
            body: _.assign(
                {},
                body,
                { api_key: config.api_key }
            ),
            json: true
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

    function feedback_historical(body) {
        return request(config.endpoints.feedback_historical, body);
    }

    function get_fingerprint_data(body) {
        return request(config.endpoints.get_fingerprint_data, body);
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
        feedback_historical: feedback_historical,
        get_fingerprint_data: get_fingerprint_data
    };
};