var assert = require('assert');
var should = require('should');

var Scrapper = require('../lib/scrapers/cloud-scraper');

describe('Cloud Scraper', function () {
    var scraper;

    beforeEach(function () {
        scraper = new Scrapper();
    });

    it('should create new instance', function (done) {
        should.exist(scraper);
        done();
    });

    it('should throw `loadServices` when called', function (done) {

        (function () {
            scraper.loadServices();
        }).should.throw(Error);

        done();
    });
});