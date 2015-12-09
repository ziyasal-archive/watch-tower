/**
 * Module dependencies.
 */

var stringUtils = require('./string-utils');


/**
 * Enum to represent service statuses
 * @type {{OperatingNormally: string, PerformanceIssues: string, ServiceDisruption: string, InformationMessage: string}}
 */
var ServiceStatus = {
    OperatingNormally: "OperatingNormally",
    PerformanceIssues: "HasPerformanceIssues",
    ServiceDisruption: "HasServiceDisruption",
    InformationMessage: "HasInformationMessage"
};

/**
 * Models to represent service
 * @param name
 * @param status
 * @constructor
 */
function Service(name, status) {

    if (stringUtils.isNullOrWhitespace(name)) {
        throw new Error('Invalid parameter `name`');
    }

    if (status === undefined) {
        throw new Error('Invalid parameter `status`');
    }

    this.name = name;
    this.status = status;
}

/**
 * exports
 */
module.exports = Service;
module.exports.ServiceStatus = ServiceStatus;