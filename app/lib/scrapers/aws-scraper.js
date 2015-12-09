/**
 * Module dependencies.
 */

var request = require('request-promise');
var Region = require('../region');
var Scraper = require('./cloud-scraper');
var Service = require('../service');

var util = require('util');
var cheerio = require('cheerio');


/**
 * Aws Scraper
 * @constructor
 */
function AwsScraper(uri) {
    this.uri = uri;
}

util.inherits(AwsScraper, Scraper);


/**
 * Load service status information from AWS
 * @param callback
 */
AwsScraper.prototype.loadServices = function (callback) {

    var options = {
        uri: this.uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    request(options)
        .then(function ($) {
            var regions = [];

            $('div#current_events_block .tabStandard').find('a').each(function (i, el) {
                var $el = $(el);

                var region = new Region($el.text());

                var tabElId = $el.attr('href');

                $(util.format('%s tbody tr', tabElId)).each(function (i, tr) {
                    var name = '';
                    var serviceStatus = Service.ServiceStatus.OperatingNormally;

                    var $firstTd = $(tr).find('td').first();

                    name = $($firstTd).next().text();

                    var $img = $($firstTd).find('img');

                    var statusImgNameWithExtension = $img.attr('src').match(/[\w:]+\.gif/i)[0];
                    var statusImgName = statusImgNameWithExtension.replace('.gif', '');

                    switch (statusImgName) {
                        case "status0":
                            serviceStatus = Service.ServiceStatus.OperatingNormally;
                            break;
                        case "status2":
                            serviceStatus = Service.ServiceStatus.PerformanceIssues;
                            break;
                        case "status3":
                            serviceStatus = Service.ServiceStatus.ServiceDisruption;
                            break;
                        case "info":
                            serviceStatus = Service.ServiceStatus.InformationMessage;
                            break;
                    }

                    region.addService(new Service(name, serviceStatus));
                });

                regions.push(region);

            }).get();

            callback(null, regions);
        })
        .catch(callback);
};


/**
 * exports
 */
module.exports = AwsScraper;