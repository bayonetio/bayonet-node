"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    fx = require('node-fixtures'),
    randomstring = require('randomstring'),
    bayonet = require('../');

describe('Bayonet SDK', function () {
    describe('#configure(options)', function () {
        it('api version should be mandatory', function () {
            expect(function () {
                bayonet.configure();
            }).to.throw(Error);
        });

        it('should not return anything', function () {
            expect(bayonet.configure({version: 1})).equal(undefined);
        });

        it('should set api_key', function () {
            var api_key = fx.requests.invalid_token;

            bayonet.configure({
                version: 1,
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
                version: 1,
                api_key: fx.requests.invalid_token
            });

            return bayonet.api.consulting(
                fx.requests.consulting
            ).then(function (r) {
                expect(true).to.equal(false);
            }).catch(function (r) {
                expect(r.error.reason_code).to.equal('11');
            });
        });

        it('should return feedback_api_trans_code', function () {
            bayonet.configure({
                version: 1,
                api_key: process.env.BAYONET_API_KEY
            });

            return bayonet.api.consulting(
                fx.requests.consulting
            ).then(function (r) {
                expect(r.reason_code).to.equal('00');
                expect(r).to.have.property('feedback_api_trans_code');
            }).catch(function (r) {
                expect(true).to.equal(false);
            });
        });
    });
});