/**
 *
 * @constructor
 */
function Scraper() {

}

/**
 * Load service status information
 * @param callback
 */
Scraper.prototype.loadServices = function (callback) {
    throw new Error("should be implemented in subclasses");
};


/**
 * exports
 */
module.exports = Scraper;