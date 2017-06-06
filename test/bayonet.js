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

    describe('#api.feedback', function () {
        it('should validate api key', function () {
            bayonet.configure({
                version: 1,
                api_key: fx.requests.invalid_token
            });

            return bayonet.api.feedback(
                fx.requests.feedback
            ).then(function (r) {
                expect(true).to.equal(false);
            }).catch(function (r) {
                expect(r.error.reason_code).to.equal('11');
            });
        });

        it('should validate feedback_api_trans_code', function () {
            bayonet.configure({
                version: 1,
                api_key: process.env.BAYONET_API_KEY
            });

            return bayonet.api.feedback(
                fx.requests.feedback
            ).then(function (r) {
                expect(true).to.equal(false);
            }).catch(function (r) {
                expect(r.error.reason_code).to.equal('87');
            });
        });

        it('should accept transaction feedback', function () {
            bayonet.configure({
                version: 1,
                api_key: process.env.BAYONET_API_KEY
            });

            return bayonet.api.consulting(
                fx.requests.consulting
            ).then(function (r) {
                fx.requests.feedback.transaction_id = randomstring.generate();
                fx.requests.feedback.feedback_api_trans_code = r.feedback_api_trans_code;

                return bayonet.api.feedback(
                    fx.requests.feedback
                ).then(function (r) {
                    fx.reset();
                    expect(r.reason_code).to.equal('00');
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
                version: 1,
                api_key: fx.requests.invalid_token
            });

            return bayonet.api.feedback_historical(
                fx.requests.feedback_historical
            ).then(function (r) {
                expect(true).to.equal(false);
            }).catch(function (r) {
                expect(r.error.reason_code).to.equal('11');
            });
        });

        it('accept transaction id from feedback api', function () {
            bayonet.configure({
                version: 1,
                api_key: process.env.BAYONET_API_KEY
            });

            return bayonet.api.consulting(
                fx.requests.consulting
            ).then(function (r) {
                fx.requests.feedback.transaction_id = randomstring.generate();
                fx.requests.feedback.feedback_api_trans_code = r.feedback_api_trans_code;

                return bayonet.api.feedback(
                    fx.requests.feedback
                ).then(function (r) {
                    fx.requests.feedback_historical.transaction_id = fx.requests.feedback.transaction_id;

                    return bayonet.api.feedback_historical(
                        fx.requests.feedback_historical
                    ).then(function (r) {
                        expect(r.reason_code).to.equal('00');
                        expect(
                            fx.requests.feedback_historical.transaction_id
                        ).to.equal(fx.requests.feedback.transaction_id);
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
                version: 1,
                api_key: process.env.BAYONET_API_KEY
            });

            fx.requests.feedback_historical.transaction_id = randomstring.generate();

            return bayonet.api.feedback_historical(
                fx.requests.feedback_historical
            ).then(function (r) {
                fx.reset();
                expect(r.reason_code).to.equal('00');
            }).catch(function (r) {
                fx.reset();
                expect(true).to.equal(false);
            });
        });
    });

    describe('#api.get_fingerprint_data', function () {
        it('should validate bayonet fingerprint token', function () {
            bayonet.configure({
                version: 1,
                api_key: fx.requests.invalid_token
            });

            return bayonet.api.get_fingerprint_data(
                fx.requests.get_fingerprint_data
            ).then(function (r) {
                expect(true).to.equal(false);
            }).catch(function (r) {
                expect(r.error.status).to.equal('Error: Invalid value for bayonet_fingerprint_token');
            });
        });
    });
});