var proxyquire = require('proxyquire');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var _ = require('lodash');
var Service = require('../lib/service');

var RestApiActionStrategy;


describe('Http Call Action Creator', function () {
    var actionStrategy, configurationProvider, configurationProviderMock, rpMock, callCount = 0, config = {
            service: "service",
            auth: {
                user: "user",
                pass: "pass"
            }
        },
        requestPromise = function (opts) {
            return {
                then: function (response) {
                    return {
                        catch: function (err) {

                        }
                    };
                }
            };
        };

    beforeEach(function () {
        configurationProvider = {
            get: function (key) {

            }
        };

        configurationProviderMock = sinon.mock(configurationProvider);

        RestApiActionStrategy = proxyquire('../lib/action-strategies/api-call-action-strategy', {'request-promise': requestPromise});

        actionStrategy = new RestApiActionStrategy(configurationProvider);
    });

    it('should create new instance', function (done) {
        should.exist(actionStrategy);
        done();
    });

    it('should throw when `createAction` called with invalid `actionType`', function (done) {

        (function () {
            actionStrategy.createAction('', {});
        }).should.throw(Error);

        done();
    });

    it('should throw when `createAction` called with invalid `data`', function (done) {


        (function () {
            actionStrategy.createAction('testActionType');
        }).should.throw(Error);

        done();
    });


    it('should POST data `createAction` called with valid parameters', function (done) {

        var actionType = "test",
            uri = "uri",
            data = [{
                name: "test",
                status: Service.ServiceStatus.InformationMessage
            }];

        var payload = {
            subject: util.format('Monitor Report %s', actionType),
            data: data
        };

        var options = {
            uri: uri,
            method: 'POST',
            json: payload
        };

        var services = _.chain(data).map(function (service) {
            return util.format('Service: %s, status:%s', service.name, service.status);
        }).value();


        configurationProviderMock.expects('get').withArgs('actionStrategies:restApi:endpoint').returns(uri);

        actionStrategy.createAction(actionType, data);

        done();
    });

    afterEach(function () {
        configurationProviderMock.verify();
    });
});