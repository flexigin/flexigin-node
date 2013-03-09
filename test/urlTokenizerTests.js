'use strict';

var assert = require('node-assertthat');

var urlTokenizer = require('../lib/urlTokenizer')('/basePath');

suite('urlTokenizer', function () {
  test('/user/html => err', function (done) {
    urlTokenizer('/user/html', function (err) {
      assert.that(err, is.not.null());
      done();
    });
  });

  test('/basePath => err', function (done) {
    urlTokenizer('/basePath', function (err) {
      assert.that(err, is.not.null());
      done();
    });
  });

  test('/basePath/user => err', function (done) {
    urlTokenizer('/basePath/user', function (err) {
      assert.that(err, is.not.null());
      done();
    });
  });

  test('/basePath/user/html => user + html', function (done) {
    urlTokenizer('/basePath/user/html', function (err, result) {
      assert.that(result.component, is.equalTo('user'));
      assert.that(result.type, is.equalTo('html'));
      done();
    });
  });

  test('/basePath/user/profile/html => user/profile + html', function (done) {
    urlTokenizer('/basePath/user/profile/html', function (err, result) {
      assert.that(result.component, is.equalTo('user/profile'));
      assert.that(result.type, is.equalTo('html'));
      done();
    });
  });
});