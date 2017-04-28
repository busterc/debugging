'use strict';

var debug = require('debug');
var path = require('path');

var STACK_UNAVAILABLE = '[Stack Trace Unavaible]';

module.exports = function Debugging(namespace) {
  var _logger = debug(namespace || 'app');

  function logger() {
    var args = [].slice.call(arguments);
    _logger.apply(this, args);
  }

  logger.callsites = function () {
    var _ = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    var stack = new Error().stack;
    Error.prepareStackTrace = _;
    if (!stack) {
      return [STACK_UNAVAILABLE];
    }
    return stack.slice(1);
  };

  logger.another = function (namespace) {
    return new Debugging(_logger.namespace + ':' + namespace);
  };

  logger.source = function (site, info) {
    if (!site) {
      return logger('* callsite was not provided *');
    }
    info = info || '';
    var source = (site === STACK_UNAVAILABLE) ? STACK_UNAVAILABLE : [path.relative(process.cwd(), site.getFileName()), site.getFunctionName(), site.getLineNumber()].join(' ');
    return logger(source, info);
  };

  return logger;
};
