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
    expect(stdout).toMatch('info!');
  });

  it('.source() requires a callsite', function () {
    debug.source();
    // => * callsite was not provided *
    expect(stdout).toMatch('callsite was not provided');
  });

  var debugTestAuth = debug.another('auth');
  it('creates another debugger with a derived namespace', function () {
    debugTestAuth('more info');
    // => test:auth more info
    expect(stdout).toMatch('test:auth');
    expect(stdout).toMatch('more info');
  });

  it('.source() includes callsite details in log message', function () {
    someFunction(debugTestAuth);
    // => test:auth lib/__tests__/debugging.test.js someFunction 45 even more info
    expect(stdout).toMatch('lib/__tests__/debugging.test.js someFunction');
    expect(stdout).toMatch('even more info');
  });
});

function someFunction(d) {
  d.source(d.callsites()[0], 'even more info');
  // => test:auth lib/__tests__/debugging.test.js someFunction 45 even more info
}
