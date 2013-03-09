'use strict';

var assert = require('node-assertthat');

var startsWith = require('../lib/startsWith');

suite('startsWith', function () {
  test('returns false if text does not contain snippet.', function () {
    assert.that(startsWith('foo', 'bar'), is.false());
  });

  test('returns false if text does not start with snippet.', function () {
    assert.that(startsWith('foobar', 'bar'), is.false());
  });

  test('returns true if text starts with snippet.', function () {
    assert.that(startsWith('barfoo', 'bar'), is.true());
  });

  test('returns true if text equals snippet.', function () {
    assert.that(startsWith('bar', 'bar'), is.true());
  });
});