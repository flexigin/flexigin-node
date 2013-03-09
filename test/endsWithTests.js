'use strict';

var assert = require('node-assertthat');

var endsWith = require('../lib/endsWith');

suite('endsWith', function () {
  test('returns false if text does not contain snippet.', function () {
    assert.that(endsWith('foo', 'bar'), is.false());
  });

  test('returns false if text does not end with snippet.', function () {
    assert.that(endsWith('barfoo', 'bar'), is.false());
  });

  test('returns true if text ends with snippet.', function () {
    assert.that(endsWith('foobar', 'bar'), is.true());
  });

  test('returns true if text equals snippet.', function () {
    assert.that(endsWith('bar', 'bar'), is.true());
  });
});