var proxyquire = require('proxyquire');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var _ = require('lodash');
var Service = require('../lib/service');

var MailActionStrategy;

var nodemailer = {
    createTransport: function (opts) {

    }
};

var transporter = {
    sendMail: function (opts, cb) {

    }
};
describe('Mail Action Creator', function () {
    var actionStrategy, configurationProvider, configurationProviderMock, nodemailerMock, transporterMock,
        config = {
            service: "service",
            auth: {
                user: "user",
                pass: "pass"
            }
        };

    beforeEach(function () {
        configurationProvider = {
            get: function (key) {

            }
        };

        nodemailerMock = sinon.mock(nodemailer);
        configurationProviderMock = sinon.mock(configurationProvider);
        transporterMock = sinon.mock(transporter);

        nodemailerMock.expects("createTransport").withArgs(config).returns(transporter);

        configurationProviderMock.expects('get').withArgs('actionStrategies:mail:smtp:service').returns(config.service);
        configurationProviderMock.expects('get').withArgs('actionStrategies:mail:smtp:auth:user').returns(config.auth.user);
        configurationProviderMock.expects('get').withArgs('actionStrategies:mail:smtp:auth:pass').returns(config.auth.pass);

        MailActionStrategy = proxyquire('../lib/action-strategies/mail-action-strategy', {'nodemailer': nodemailer});

        actionStrategy = new MailActionStrategy(configurationProvider);
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


    it('should send mail `createAction` called with valid parameters', function (done) {

        var actionType = "test",
            from = "from",
            to = "to",
            ttl = 10000,
            data = [{
                name: "test",
                status: Service.ServiceStatus.InformationMessage
            }];

        var services = _.chain(data).map(function (service) {
            return util.format('Service: %s, status:%s', service.name, service.status);
        }).value();

        var options = {
            from: from,
            to: to,
            subject: util.format('Monitor Report %s', actionType),
            text: services.join('\n')
        };

        transporterMock.expects('sendMail').withArgs(options)
            .callsArgWith(1, undefined, {response: {}})
            .once();

        configMockInit(from, to, ttl);

        actionStrategy.createAction(actionType, data, function (err, data) {

            should.not.exist(err);
            should.exist(data);

            done();
        });

    });

    it('should call callback with error when `sendMail` fails', function (done) {

        var actionType = "test",
            from = "from",
            to = "to",
            ttl = 10000,
            data = [{
                name: "test",
                status: Service.ServiceStatus.InformationMessage
            }];

        var services = _.chain(data).map(function (service) {
            return util.format('Service: %s, status:%s', service.name, service.status);
        }).value();

        var options = {
            from: from,
            to: to,
            subject: util.format('Monitor Report %s', actionType),
            text: services.join('\n')
        };

        transporterMock.expects('sendMail').withArgs(options)
            .callsArgWith(1, new Error())
            .once();

        configMockInit(from, to, ttl);

        actionStrategy.createAction(actionType, data, function (err, data) {

            should.exist(err);

            done();
        });

    });

    function configMockInit(from, to, ttl) {
        configurationProviderMock.expects('get').withArgs('actionStrategies:mail:smtp:options:from').returns(from);
        configurationProviderMock.expects('get').withArgs('actionStrategies:mail:smtp:options:to').returns(to);
        configurationProviderMock.expects('get').withArgs('actionStrategies:mail:waitingCache:ttl').returns(ttl);
    }

    afterEach(function () {
        configurationProviderMock.verify();
        nodemailerMock.verify();
        transporterMock.verify();
    });
});