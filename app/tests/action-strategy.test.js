var assert = require('assert');
var should = require('should');

var ActionStrategy = require('../lib/action-strategies/action-strategy');

describe('Action Strategy', function () {
    var actionStrategy;

    beforeEach(function () {
        actionStrategy = new ActionStrategy();
    });

    it('should create new instance', function (done) {
        should.exist(actionStrategy);
        done();
    });

    it('should throw `createAction` when called', function (done) {
        (function () {
            actionStrategy.createAction();
        }).should.throw(Error);

        done();
    });
});