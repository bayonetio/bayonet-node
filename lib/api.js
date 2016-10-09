"use strict";

var _ = require('lodash');
var util = require('util');
var rq = require('request-promise');
var config = null;

module.exports = function () {
    function configure(options) {
        _.assign(
            (config = {
                request: {
                    method: 'POST',
                    json: true
                },
                endpoints: {
                    consulting: 'v1/consulting',
                    feedback: 'v1/feedback',
                    feedback_historical: 'v1/feedback-historical'
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
                config.endpoints.consulting
            ),
            body: _.assign(
                {},
                body,
                { api_key: config.api_key }
            )
        };

        rq(
            _.assign(
                settings,
                config.request
            )
        )
            .then(function (parsedBody) {
                console.log('Success', parsedBody);
            })
            .catch(function (error) {
                console.log('Error', error);
            });
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