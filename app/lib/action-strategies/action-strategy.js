/**
 * Abstract action strategy
 * @constructor
 */
function ActionStrategy() {

}

/**
 * Create action e.g mail, push, http call
 * @param actionType
 * @param data
 * @param cb
 */
ActionStrategy.prototype.createAction = function (actionType, data, cb) {
    throw new Error("should be implemented in subclasses");
};

/**
 * exports
 */
module.exports = ActionStrategy;