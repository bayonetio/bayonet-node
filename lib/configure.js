"use strict";

var version = exports.version = require('../package').version;

var default_options = exports.default_options = {
    'mode': 'sandbox',
    'schema': 'https',
    'host': 'api.bayonet.io/v1',
    'content_type': 'application/json',
    'endpoints': {
        consulting: '/consulting',
        feedback: '/feedback',
        feedback_historical: '/feedback-historical'
    }
};