#!/usr/bin/env node

/**
 * Module dependencies.
 */

var configurationProvider = require('nconf');
var Monitor = require('../lib/monitor');

configurationProvider.argv()
    .env()
    .file({file: __dirname + '/config.json'});

var AwsScraper = require('../lib/scrapers/aws-scraper');
var MailActionStrategy = require('../lib/action-strategies/mail-action-strategy');
var RestApiActionStrategy = require('../lib/action-strategies/api-call-action-strategy');

program();

function program() {
    var scrapers = [
        new AwsScraper(configurationProvider.get('scrapers:aws:endpoint'))
    ];

    var actionStrategies = [
        new RestApiActionStrategy(configurationProvider),
        new MailActionStrategy(configurationProvider)
    ];

    console.log("[MONITOR] started.");
    var monitor = new Monitor(configurationProvider, scrapers, actionStrategies);

    monitor.start(function (err, message) {
        console.log(message);
    });
}