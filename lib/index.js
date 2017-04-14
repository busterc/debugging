'use strict';

var callsites = require('callsites');
var debug = require('debug');
var path = require('path');

module.exports = function Debugging(namespace) {
  var _logger = debug(namespace || 'app');

  function logger() {
    var args = [].slice.call(arguments);
    _logger.apply(this, args);
  }

  logger.callsites = callsites;

  logger.another = function (namespace) {
    return new Debugging(_logger.namespace + ':' + namespace);
  };

  logger.source = function (site, info) {
    if (!site) {
      return logger('* callsite was not provided *');
    }
    info = info || '';
    var source = [path.relative(process.cwd(), site.getFileName()), site.getFunctionName(), site.getLineNumber()].join(' ');
    return logger(source, info);
  };

  return logger;
};
