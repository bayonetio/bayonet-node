"use strict";

var chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    fx = require('node-fixtures'),
    randomstring = require('randomstring'),
    bayonet = require('../');

describe('Bayonet SDK', function () {
    describe('#configure(options)', function () {
        it('should not return anything', function () {
            expect(bayonet.configure()).equal(undefined);
        });

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
});