var assert = require('assert');
var should = require('should');

var Service = require('../lib/service');

describe('Service Model', function () {
    var service;

    it('should create new instance', function (done) {
        service = new Service('test', 'http://testapi.com', true);
        should.exist(service);
        done();
    });

    it('should throw an `Error` with invalid name', function (done) {

        (function () {
            region = new Service('', 'testurl', true);
        }).should.throw(Error);

        done();
    });

    it('should throw an `Error` with invalid status', function (done) {

        (function () {
            region = new Service('test');
        }).should.throw(Error);

        done();
    });
});