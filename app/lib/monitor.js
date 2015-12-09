/**
 * Module dependencies.
 */

var CronJob = require('cron').CronJob;
var _ = require('lodash');
var Service = require('./service');
var util = require('util');
var async = require('async');

function Monitor(configurationProvider, scrapers, actionStrategies) {
    this.configurationProvider = configurationProvider;
    this.scrapers = scrapers;
    this.actionStrategies = actionStrategies;
}

/**
 * Start to monitor
 * @param callback
 */
Monitor.prototype.start = function (callback) {
    function actionCompleteHandler(err, httpResponse, body) {
        //noop
    }

    function onTick() {
        var _scrapers = this.scrapers, _actionStrategies = this.actionStrategies;

        async.each(_scrapers, function (scraper, scraperCallback) {

            scraper.loadServices(function (err, regions) {
                if (err) {
                    return scraperCallback(err);
                }

                if (regions) {

                    async.each(regions, function (region, regionCallback) {

                        async.each(_actionStrategies, function (actionStrategy, actionStrategyCallback) {

                            try {
                                if (region.services.hasServiceDisruption.length > 0) {
                                    actionStrategy.createAction(Service.ServiceStatus.ServiceDisruption, region.services.hasServiceDisruption, actionCompleteHandler);
                                }

                                if (region.services.hasPerformanceIssues.length > 0) {
                                    actionStrategy.createAction(Service.ServiceStatus.PerformanceIssues, region.services.hasPerformanceIssues, actionCompleteHandler);
                                }

                                if (region.services.hasInformationMessage.length > 0) {
                                    actionStrategy.createAction(Service.ServiceStatus.InformationMessage, region.services.hasInformationMessage, actionCompleteHandler);
                                }

                                actionStrategyCallback();
                            } catch (ex) {
                                actionStrategyCallback(ex);
                            }
                        }, function (err) {

                            if (err) {
                                return regionCallback(err);
                            }

                            regionCallback();

                        });

                    }, function (err) {

                        if (err) {
                            return scraperCallback(err);
                        }

                        scraperCallback();
                    });
                }
            });
        }, function (err) {
            if (err) {
                return callback(err);
            }

            return callback(null, util.format('Operation completed at %s', new Date()));
        });
    }

    try {
        var job = new CronJob({
                cronTime: this.configurationProvider.get('monitor:intervalCronExpr'),
                onTick: onTick.bind(this),
                start: false,
                timeZone: this.configurationProvider.get('monitor:timeZone')
            }
        );

        job.start();

    } catch (ex) {
        callback(ex);
    }
};


/**
 * exports
 */
module.exports = Monitor;