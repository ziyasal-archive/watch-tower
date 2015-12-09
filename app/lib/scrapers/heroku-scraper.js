/**
 * Module dependencies.
 */

var util = require('util');
var Scraper = require('./cloud-scraper');

/**
 * Heroku scraper
 * @constructor
 */
function HerokuScraper() {

}


util.inherits(HerokuScraper, Scraper);

/**
 * Load service status information from Heroku
 * @param callback
 */
HerokuScraper.prototype.loadServices = function (callback) {
    //implement here
};


/**
 * exports
 */
module.exports = HerokuScraper;