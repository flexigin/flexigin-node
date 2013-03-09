'use strict';

var http = require('http'),
    path = require('path');

var assert = require('node-assertthat'),
    connect = require('connect');

var flexigin = require('../lib/flexigin');

suite('flexigin', function () {
  test('throws an error if no options are given.', function () {
    assert.that(function () {
      flexigin();
    }, is.throwing());
  });

  test('throws an error if options.baseUrl is missing.', function () {
    assert.that(function () {
      flexigin({
        basePath: 'foo'
      });
    }, is.throwing());
  });

  test('throws an error if options.basePath is missing.', function () {
    assert.that(function () {
      flexigin({
        baseUrl: 'foo'
      });
    }, is.throwing());
  });

  test('returns a Connect middleware.', function () {
    var actual = flexigin({
      baseUrl: '/components',
      basePath: path.join(__dirname, 'components')
    });
    assert.that(actual, is.ofType('function'));
  });

  suite('middleware', function () {
    var app = connect();
    app.use(flexigin({
      baseUrl: '/components',
      basePath: path.join(__dirname, 'components')
    }));
    http.createServer(app).listen(3000);

    test('calls the next component when the request\'s url does not start with the basepath.', function (done) {
      app({ url: '/' }, {}, function () {
        done();
      });
    });

    test('returns a 404 when a non-existent component is requested.', function (done) {
      http.get('http://localhost:3000/components/profile', function (res) {
        assert.that(res.statusCode, is.equalTo(404));
        done();
      });
    });

    test('returns a 404 when an invalid type is requested.', function (done) {
      http.get('http://localhost:3000/components/user/img', function (res) {
        assert.that(res.statusCode, is.equalTo(404));
        done();
      });
    });

    test('returns the content when html is requested.', function (done) {
      http.get('http://localhost:3000/components/user/html', function (res) {
        assert.that(res.statusCode, is.equalTo(200));
        done();
      });
    });
  });
});