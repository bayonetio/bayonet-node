"use strict";

var version = exports.version = require('../package').version;
require('dotenv').config({ path: '../.env' });

var default_options = exports.default_options = {
  api_key: process.env.BAYONET_API_KEY || '',
  schema: process.env.BAYONET_SCHEMA || 'https',
  host: process.env.BAYONET_HOST || 'api.bayonet.io'
};
