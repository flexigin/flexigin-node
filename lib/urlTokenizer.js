'use strict';

var _ = require('underscore');

var startsWith = require('./startsWith');
var endsWith = require('./endsWith');

var urlTokenizer = function (basePath) {
  return function (url, callback) {
    if (!startsWith(url, basePath)) { return callback('url does not contain basePath.'); }
    if (url.indexOf('?') > 0) { url = url.split('?')[0]; } // Remove the querystring
    if (endsWith(url, '/')) { url = url.slice(0, url.length - 1); } // Remove the last slash

    var urlParts = url.slice(basePath.length + 1).split('/');
    if (urlParts.length === 0) { return callback('component and type are missing.'); }
    if (urlParts.length === 1) { return callback('type is missing.'); }

    callback(null, {
      component: _.initial(urlParts).join('/'),
      type: _.last(urlParts)
    });
  };
};

module.exports = urlTokenizer;