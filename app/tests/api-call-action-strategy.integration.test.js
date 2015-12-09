var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var _ = require('lodash');
var Service = require('../lib/service');

var RestApiActionStrategy = require('../lib/action-strategies/api-call-action-strategy');


describe('Http Call Action Creator', function () {
    var actionStrategy, configurationProvider, configurationProviderMock;

    before(function () {
        require("../mock-api/api");
    });

    beforeEach(function () {
        configurationProvider = {
            get: function (key) {
            }
        };

        configurationProviderMock = sinon.mock(configurationProvider);
        actionStrategy = new RestApiActionStrategy(configurationProvider);
    });

    it('should create new instance', function (done) {
        should.exist(actionStrategy);
        done();
    });

    it('should POST data `createAction` called with valid parameters', function (done) {

        var actionType = "test",
            uri = "http://localhost:8080/notify",
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

        actionStrategy.createAction(actionType, data, function (err, httpResponse, body) {
            should.not.exist(err);
            done();
        });

    });

    afterEach(function () {
        configurationProviderMock.verify();
    });
});