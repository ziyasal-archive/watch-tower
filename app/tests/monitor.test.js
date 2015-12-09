var assert = require('assert');
var should = require('should');

var Service = require('../lib/service');
var Monitor = require('../lib/monitor');

var AwsScraper = require('../lib/scrapers/aws-scraper');
var RestApiActionStrategy = require('../lib/action-strategies/api-call-action-strategy');


var configurationProvider = require('nconf');

configurationProvider.argv()
    .env()
    .file({file: __dirname + '/config.json'});

describe('Monitor', function () {

    var monitor, actionStrategy;

    before(function () {
        require("../mock-api/api");
        actionStrategy = new RestApiActionStrategy(configurationProvider);
    });

    it('should create new instance', function (done) {
        monitor = new Monitor(configurationProvider, [new AwsScraper('http://localhost:8080/green')], [actionStrategy]);
        should.exist(monitor);
        done();
    });

    it('should process `ServiceDisruption`', function (done) {
        //https://github.com/mochajs/mocha/issues/1066
        // Workaround "done() called multiple times"
        this.timeout(60000);
        var done_called = false;

        monitor = new Monitor(configurationProvider, [new AwsScraper('http://localhost:8080/disruption')], [actionStrategy]);

        monitor.start(function (err, result) {
            should.not.exist(err);
            if (!done_called) {
                done();
                done_called = true;
            }
        });
    });

    it('should process `PerformanceIssues`', function (done) {
        //https://github.com/mochajs/mocha/issues/1066
        // Workaround "done() called multiple times"
        this.timeout(60000);
        var done_called = false;

        monitor = new Monitor(configurationProvider, [new AwsScraper('http://localhost:8080/performanceissues')], [actionStrategy]);

        monitor.start(function (err, result) {
            should.not.exist(err);
            if (!done_called) {
                done();
                done_called = true;
            }
        });
    });

    it('should process `InformationMessage`', function (done) {
        //https://github.com/mochajs/mocha/issues/1066
        // Workaround "done() called multiple times"
        this.timeout(60000);
        var done_called = false;

        monitor = new Monitor(configurationProvider, [new AwsScraper('http://localhost:8080/information')], [actionStrategy]);

        monitor.start(function (err, result) {
            should.not.exist(err);
            if (!done_called) {
                done();
                done_called = true;
            }
        });
    });

    it('should not start when cron expr is invalid.', function (done) {
        configurationProvider.set('monitor:intervalCronExpr', 'Invalid expression');
        monitor = new Monitor(configurationProvider, [new AwsScraper('http://localhost:8080/green')], [actionStrategy]);

        monitor.start(function (err, result) {
            should.exist(err);
            done();
        });
    });

    it('should throw error on invalid operation', function (done) {
        //https://github.com/mochajs/mocha/issues/1066
        // Workaround "done() called multiple times"
        this.timeout(60000);
        var done_called = false;

        monitor = new Monitor(configurationProvider, [new AwsScraper('http://localhost:8080/error/green')], [actionStrategy]);

        monitor.start(function (err, result) {
            should.exist(err);
            if (!done_called) {
                done();
                done_called = true;
            }
        });
    });
});