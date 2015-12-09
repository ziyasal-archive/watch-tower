/**
 * Module dependencies.
 */

var util = require('util');
var ActionStrategy = require('./action-strategy');
var stringUtils = require('../string-utils');
var nodemailer = require('nodemailer');
var _ = require('lodash');
var NodeCache = require("node-cache");

//Store services to waiting cache that email already sent to prevent flood inbox.
//In production use Redis like solutions.
var localWaitingCache = new NodeCache();

function MailActionStrategy(configurationProvider) {
    this.configurationProvider = configurationProvider;

    var transporterConfig = {
        service: this.configurationProvider.get('actionStrategies:mail:smtp:service'),
        auth: {
            user: this.configurationProvider.get('actionStrategies:mail:smtp:auth:user'),
            pass: this.configurationProvider.get('actionStrategies:mail:smtp:auth:pass')
        }
    };

    this.transporter = nodemailer.createTransport(transporterConfig);
}

util.inherits(MailActionStrategy, ActionStrategy);

/**
 * Create action mail
 * @param actionType
 * @param data
 * @param callback
 */
MailActionStrategy.prototype.createAction = function (actionType, data, callback) {

    if (stringUtils.isNullOrWhitespace(actionType)) {
        throw new Error('Invalid parameter `actionType`');
    }

    if (!data) {
        throw new Error('Invalid parameter `data`');
    }


    var services = _.chain(data).filter(function (service) {
        //Tests omitted for brevity.
        //Store services to waiting cache that email already sent to prevent flood inbox.
        if (localWaitingCache.get(service.name)) {
            return false;
        } else {
            var ttl = this.configurationProvider.get('actionStrategies:mail:waitingCache:ttl');
            localWaitingCache.set(service.name, service, ttl);
            return true;
        }

    }.bind(this)).map(function (service) {
        return util.format('Service: %s, status:%s', service.name, service.status);
    }).value();


    if (services.length > 0) {
        var payload = {
            subject: util.format('Monitor Report %s', actionType),
            text: services.join('\n')
        };

        var mailOptions = {
            from: this.configurationProvider.get('actionStrategies:mail:smtp:options:from'),
            to: this.configurationProvider.get('actionStrategies:mail:smtp:options:to'),
            subject: payload.subject,
            text: payload.text
        };

        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return callback(error);
            }

            callback(null, info);
        });
    }
};


/**
 * exports
 */
module.exports = MailActionStrategy;