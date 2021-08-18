"use strict";

var chai = require('chai'),
  expect = chai.expect,
  fx = require('node-fixtures'),
  randomstring = require('randomstring'),
  bayonet = require('../');
require('dotenv').config();

describe('Bayonet SDK', function () {
  describe('#configure(options)', function () {
    it('should set api_key', function () {
      var api_key = fx.requests.invalid_token;

      bayonet.configure({
        api_key: api_key
      });

      expect(
        bayonet.api.getConfig().api_key
      ).equal(api_key);
    });
  });

  describe('#api.consulting', function () {
    it('should validate api key', function () {
      bayonet.configure({
        api_key: fx.requests.invalid_token
      });

      return bayonet.api.consulting(
        fx.requests.consulting
      ).then(function (r) {
        expect(r.reason_code).to.equal(12);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('should return bayonet_tracking_id', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      return bayonet.api.consulting(
        fx.requests.consulting
      ).then(function (r) {
        expect(r.reason_code).to.equal(0);
        expect(r).to.have.property('bayonet_tracking_id');
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });
  });

  describe('#api.update_transaction', function () {
    it('should validate api key', function () {
      bayonet.configure({
        api_key: fx.requests.invalid_token
      });

      return bayonet.api.update_transaction(
        fx.requests.feedback
      ).then(function (r) {
        expect(r.reason_code).to.equal(12);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('should validate bayonet_tracking_id', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      return bayonet.api.update_transaction(
        fx.requests.update_transaction
      ).then(function (r) {
        expect(r.reason_code).to.equal(162);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('should accept bayonet_tracking_id', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      return bayonet.api.consulting(
        fx.requests.consulting
      ).then(function (r) {
        fx.requests.update_transaction.transaction_id = randomstring.generate();
        fx.requests.update_transaction.bayonet_tracking_id = r.bayonet_tracking_id;

        return bayonet.api.update_transaction(
          fx.requests.update_transaction
        ).then(function (r) {
          fx.reset();
          expect(r.reason_code).to.equal(0);
        }).catch(function (r) {
          fx.reset();
          expect(true).to.equal(false);
        });
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });
  });

  describe('#api.feedback_historical', function () {
    it('should validate api key', function () {
      bayonet.configure({
        api_key: fx.requests.invalid_token
      });

      return bayonet.api.feedback_historical(
        fx.requests.feedback_historical
      ).then(function (r) {
        expect(r.reason_code).to.equal(12);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('accept transaction id from feedback api', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      return bayonet.api.consulting(
        fx.requests.consulting
      ).then(function (r) {
        fx.requests.update_transaction.transaction_id = randomstring.generate();
        fx.requests.update_transaction.bayonet_tracking_id = r.bayonet_tracking_id;

        return bayonet.api.update_transaction(
          fx.requests.update_transaction
        ).then(function (r) {
          fx.requests.feedback_historical.transaction_id = fx.requests.update_transaction.transaction_id;

          return bayonet.api.feedback_historical(
            fx.requests.feedback_historical
          ).then(function (r) {
            expect(r.reason_code).to.equal(0);
            expect(
              fx.requests.feedback_historical.transaction_id
            ).to.equal(fx.requests.update_transaction.transaction_id);
            fx.reset();
          }).catch(function (r) {
            fx.reset();
            expect(true).to.equal(false);
          });
        }).catch(function (r) {
          fx.reset();
          expect(true).to.equal(false);
        });
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('accept any transaction_id', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      fx.requests.feedback_historical.transaction_id = randomstring.generate();

      return bayonet.api.feedback_historical(
        fx.requests.feedback_historical
      ).then(function (r) {
        fx.reset();
        expect(r.reason_code).to.equal(0);
      }).catch(function (r) {
        fx.reset();
        expect(true).to.equal(false);
      });
    });
  });

  describe('#api.blocklist/whitelist', function () {
    it('should validate api key', function () {
      bayonet.configure({
        api_key: fx.requests.invalid_token
      });

      return bayonet.api.blocklist_add(
        fx.requests.blocklist_valid
      ).then(function (r) {
        expect(r.reason_code).to.equal(12);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('should validate email in system when adding to a list', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      return bayonet.api.blocklist_add(
        fx.requests.blocklist_invalid
      ).then(function (r) {
        expect(r.reason_code).to.equal(152);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });

    it('should accept email when adding to a list', function () {
      bayonet.configure({
        api_key: process.env.BAYONET_API_KEY
      });

      return bayonet.api.blocklist_add(
        fx.requests.blocklist_valid
      ).then(function (r) {
        expect(r.reason_code).to.equal(0);
      }).catch(function (r) {
        expect(true).to.equal(false);
      });
    });
  });
});
