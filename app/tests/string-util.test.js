var assert = require('assert');
var should = require('should');

var stringUtils = require("../lib/string-utils");

describe('String Utils', function () {

    it('should throw Error when input null', function (done) {
        stringUtils.isNullOrWhitespace(null).should.be.exactly(true);
        done();
    });

    it('should throw Error when input whitespace', function (done) {
        stringUtils.isNullOrWhitespace(' ').should.be.exactly(true);
        done();
    });

    it('should return true when input valid', function (done) {
        stringUtils.isNullOrWhitespace('test').should.be.exactly(false);
        done();
    });


});
