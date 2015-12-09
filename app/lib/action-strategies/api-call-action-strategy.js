/**
 * Module dependencies.
 */

var util = require('util');
var ActionCreator = require('./action-strategy');
var request = require('request-promise');
var stringUtils = require('../string-utils');

function ApiCallActionStrategy(configurationProvider) {
    this.configurationProvider = configurationProvider;
}

util.inherits(ApiCallActionStrategy, ActionCreator);

/**
 * Create action http call
 * @param actionType
 * @param data
 * @param callback
 */
ApiCallActionStrategy.prototype.createAction = function (actionType, data, callback) {

    if (stringUtils.isNullOrWhitespace(actionType)) {
        throw new Error('Invalid parameter `actionType`');
    }

    if (!data) {
        throw new Error('Invalid parameter `data`');
    }

    var payload = {
        subject: util.format('Monitor Report %s', actionType),
        data: data
    };

    var options = {
        uri: this.configurationProvider.get('actionStrategies:restApi:endpoint'),
        method: 'POST',
        json: payload
    };


    request(options)
        .then(function (err, httpResponse, body) {
            if (err) {
                return callback(err);
            }

            callback(null, httpResponse, body);
        })
        .catch(callback);
};

/**
 * exports
 */
module.exports = ApiCallActionStrategy;