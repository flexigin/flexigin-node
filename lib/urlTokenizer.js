'use strict';

var _ = require('underscore'),
    S = require('string');

var urlTokenizer = function (basePath) {
  return function (url, callback) {
    if (!S(url).startsWith(basePath)) { return callback('url does not contain basePath.'); }
    
    if (url.indexOf('?') !== -1) { url = url.split('?')[0]; }
    if (S(url).endsWith('/')) { url = url.slice(0, url.length - 1); }

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