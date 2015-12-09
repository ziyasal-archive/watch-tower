var assert = require('assert');
var should = require('should');

var Region = require('../lib/region');
var Service = require('../lib/service');

describe('Region Model', function () {
    var region;

    it('should create new instance', function (done) {
        region = new Region('test');
        should.exist(region);
        done();
    });

    it('should throw an `Error` with invalid params', function (done) {

        (function () {
            region = new Region();
        }).should.throw(Error);

        done();
    });

    it('should throw an `Error` when `addService` called with invalid params', function (done) {

        region = new Region('test');
        (function () {
            region.addService();
        }).should.throw(Error);

        done();
    });

    it('should add service when `addService` called with valid params', function (done) {

        region = new Region('test');

        region.addService(new Service("test", Service.ServiceStatus.OperatingNormally));

        done();
    });


    it('should add service to `operatingNormally`', function (done) {

        region = new Region('test');

        region.addService(new Service("test", Service.ServiceStatus.OperatingNormally));

        region.services.operatingNormally.length.should.be.exactly(1);

        done();
    });

    it('should add service to `hasInformationMessage`', function (done) {

        region = new Region('test');

        region.addService(new Service("test", Service.ServiceStatus.InformationMessage));

        region.services.hasInformationMessage.length.should.be.exactly(1);

        done();
    });

    it('should add service to `hasServiceDisruption`', function (done) {

        region = new Region('test');

        region.addService(new Service("test", Service.ServiceStatus.ServiceDisruption));

        region.services.hasServiceDisruption.length.should.exactly(1);

        done();
    });

    it('should add service to `hasPerformanceIssues`', function (done) {

        region = new Region('test');

        region.addService(new Service("test", Service.ServiceStatus.PerformanceIssues));

        region.services.hasPerformanceIssues.length.should.be.exactly(1);

        done();
    });

});