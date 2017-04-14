var assert = require('assert');
var intercept = require('intercept-stdout');
var Debugging = require('../index.js');
var stdout = '';

var unhookIntercept = intercept(function (output) {
  stdout += output;
  return '';
});

afterAll(function () {
  unhookIntercept();
});

describe('debugging', function () {
  var debug = new Debugging('test');
  it('logs as expected', function () {
    debug('info!');
    // => test info!
    assert(Boolean(stdout.match('info!')));
  });

  it('.source() requires a callsite', function () {
    debug.source();
    // => * callsite was not provided *
    assert(Boolean(stdout.match('callsite was not provided')));
  });

  var debugTestAuth = debug.another('auth');
  it('creates another debugger with a derived namespace', function () {
    debugTestAuth('more info');
    // => test:auth more info
    assert(Boolean(stdout.match('test:auth')));
    assert(Boolean(stdout.match('more info')));
  });

  it('.source() includes callsite details in log message', function () {
    someFunction(debugTestAuth);
    // => test:auth lib/__tests__/debugging.test.js someFunction 45 even more info
    assert(Boolean(stdout.match('lib/__tests__/debugging.test.js someFunction 45 even more info')));
  });
});

function someFunction(d) {
  d.source(d.callsites()[0], 'even more info');
  // => test:auth lib/__tests__/debugging.test.js someFunction 45 even more info
}
