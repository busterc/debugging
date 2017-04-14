# debugging [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> this.debugging = [debug](https://github.com/visionmedia/debug) + [callsites](https://github.com/sindresorhus/callsites) + derived namespacing

## Installation

```sh
$ npm install --save debugging
```

## Usage

```js
'use strict';

var Debugging = require('debugging');

var debug = new Debugging('app');
debug('info');
// => app info

var debugAppAuth = debug.another('auth');
debugAppAuth('more info');
// => app:auth more info

(function someFunction() {
  debugAppAuth.source(debugAppAuth.callsites()[0], 'even more info');
  // => app:auth some-dir/some-file.js someFunction 14 even more info
})();
```

## API

## Debugging([namespace])

- #### namespace

    Type `String`

    The initial namespace to be applied to the debug logger; the default is 'app'.

### another(namespace) : Debugging

- #### namespace

    *Required*
    Type `String`

    A namespace to be appended to the current debug namespace

### source(callsite, [info])

    Log with callsite details

- #### callsite

    *Required*
    Type: `Object`

- #### info

    Type: `Any`


## License

ISC © [Buster Collings](https://about.me/buster)

[npm-image]: https://badge.fury.io/js/debugging.svg
[npm-url]: https://npmjs.org/package/debugging
[travis-image]: https://travis-ci.org/busterc/debugging.svg?branch=master
[travis-url]: https://travis-ci.org/busterc/debugging
[daviddm-image]: https://david-dm.org/busterc/debugging.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/busterc/debugging
