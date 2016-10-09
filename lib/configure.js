"use strict";

var version = exports.version = require('../package').version;

var default_options = exports.default_options = {
    'mode': process.env.MODE || 'sandbox',
    'api_key': process.env.API_KEY || '',
    'schema': 'https',
    'host': 'api.bayonet.io/v1',
    'content_type': 'application/json',
    'endpoints': {
        consulting: '/consulting',
        feedback: '/feedback',
        feedback_historical: '/feedback-historical'
    }
};