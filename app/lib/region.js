/**
 * Module dependencies.
 */

var stringUtils = require('./string-utils');
var _ = require('lodash');
var Service = require('./service');

/**
 * Models to represent region
 * @param name
 * @constructor
 */
function Region(name) {
    if (stringUtils.isNullOrWhitespace(name)) {
        throw new Error('name cannot be null or whitespace');
    }

    this.name = name;

    this.services = {
        operatingNormally: [],
        hasPerformanceIssues: [],
        hasServiceDisruption: [],
        hasInformationMessage: []
    };
}

/**
 * Add service
 * @param service
 */
Region.prototype.addService = function (service) {

    if (!service) {
        throw new Error('Invalid parameter `service`');
    }

    switch (service.status) {
        case Service.ServiceStatus.OperatingNormally:
        {
            this.services.operatingNormally.push(service);
            break;
        }
        case Service.ServiceStatus.PerformanceIssues:
        {
            this.services.hasPerformanceIssues.push(service);
            break;
        }
        case Service.ServiceStatus.ServiceDisruption:
        {
            this.services.hasServiceDisruption.push(service);
            break;
        }
        case Service.ServiceStatus.InformationMessage:
        {
            this.services.hasInformationMessage.push(service);
            break;
        }
    }
};


/**
 * exports
 */
module.exports = Region;