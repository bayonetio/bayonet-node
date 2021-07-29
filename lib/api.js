"use strict";

var _ = require('lodash');
var https = require('https');
var config = null;

module.exports = function () {
  function configure(options) {
    _.assign(
      (config = {
        request: {
          method: 'POST',
          json: true,
          headers: {
            'Content-Type': 'application/json'
          }
        },
        endpoints: {
          consulting: '/v2/sigma/consult',
          update_transaction: '/v2/sigma/update-transaction',
          feedback_historical: '/v2/sigma/feedback-historical',
          blocklist_add: '/v2/sigma/labels/block/add',
          blocklist_remove: '/v2/sigma/labels/block/add',
          whitelist_add: '/v2/sigma/labels/whitelist/add',
          whitelist_remove: '/v2/sigma/labels/whitelist/add',
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
    var requestBody = _.assign(
      {},
      body,
      {
        auth: {
          api_key: config.api_key
        }
      }
    );

    return new Promise(function (resolve) {
      var options = {
        host: curr_host,
        path: endpoint,
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      };

      var callback = function (response) {
        var str = '';

        response.on('data', function (chunk) {
          str += chunk;
        });

        response.on('end', function () {
          var obj = JSON.parse(str);
          resolve(obj);
        });
      };

      var request = https.request(options, callback);
      request.write(JSON.stringify(requestBody));
      request.end();
    });
  }

  function consulting(body) {
    return request(config.endpoints.consulting, body);
  }

  function update_transaction(body) {
    return request(config.endpoints.update_transaction, body);
  }

  function feedback_historical(body) {
    return request(config.endpoints.feedback_historical, body);
  }

  function blocklist_add(body) {
    return request(config.endpoints.blocklist_add, body);
  }

  function blocklist_remove(body) {
    return request(config.endpoints.blocklist_remove, body);
  }

  function whitelist_add(body) {
    return request(config.endpoints.whitelist_add, body);
  }

  function whitelist_remove(body) {
    return request(config.endpoints.whitelist_remove, body);
  }

  // run default configuration
  configure(
    require('./configure').default_options
  );

  return {
    configure: configure,
    getConfig: getConfig,
    consulting: consulting,
    update_transaction: update_transaction,
    feedback_historical: feedback_historical,
    blocklist_add: blocklist_add,
    blocklist_remove: blocklist_remove,
    whitelist_add: whitelist_add,
    whitelist_remove: whitelist_remove
  };
};
