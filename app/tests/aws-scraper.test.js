var assert = require('assert');
var should = require('should');

var AwsScrapper = require('../lib/scrapers/aws-scraper');

describe('Aws Scraper', function () {
    var awsScrapper;

    before(function () {
        require("../mock-api/api");
    });

    it('should create new instance', function (done) {
        awsScrapper = new AwsScrapper('http://localhost:8080/green');
        should.exist(awsScrapper);
        done();
    });

    it('should get `loadServices` all services', function (done) {

        awsScrapper = new AwsScrapper('http://localhost:8080/green');
        awsScrapper.loadServices(function (err, regions) {

            should.exist(regions);
            regions.length.should.be.exactly(4);
            done();
        });
    });

    it('should get `loadServices` all `green` services', function (done) {

        awsScrapper = new AwsScrapper('http://localhost:8080/green');
        awsScrapper.loadServices(function (err, regions) {

            should.exist(regions);
            regions.length.should.be.exactly(4);
            regions[0].services.operatingNormally.length.should.be.exactly(1);
            done();
        });
    });

    it('should get `loadServices` all `disruption` services', function (done) {

        awsScrapper = new AwsScrapper('http://localhost:8080/disruption');
        awsScrapper.loadServices(function (err, regions) {

            should.exist(regions);
            regions.length.should.be.exactly(4);
            regions[0].services.hasServiceDisruption.length.should.be.exactly(1);
            done();
        });
    });

    it('should get `loadServices` all `performanceissues` services', function (done) {

        awsScrapper = new AwsScrapper('http://localhost:8080/performanceissues');
        awsScrapper.loadServices(function (err, regions) {

            should.exist(regions);
            regions.length.should.be.exactly(4);
            regions[0].services.hasPerformanceIssues.length.should.be.exactly(1);
            done();
        });
    });

    it('should get `loadServices` all `information` services', function (done) {

        awsScrapper = new AwsScrapper('http://localhost:8080/information');
        awsScrapper.loadServices(function (err, regions) {

            should.exist(regions);
            regions.length.should.be.exactly(4);
            regions[0].services.hasInformationMessage.length.should.be.exactly(1);
            done();
        });
    });
});