'use strict';

var fs = require('fs'),
    path = require('path');

var startsWith = require('./startsWith');

var send = function (res, statusCode) {
  res.writeHead(statusCode);
  res.end();
};

var flexigin = function (options) {
  if (!options) { throw new Error('options are missing.'); }
  if (!options.baseUrl) { throw new Error('options.baseUrl is missing.'); }
  if (!options.basePath) { throw new Error('options.basePath is missing.'); }

  var urlTokenizer = require('./urlTokenizer')(options.baseUrl);

  return function (req, res, next) {
    if (!startsWith(req.url, options.baseUrl)) {
      return next();
    }

    urlTokenizer(req.url, function (err, result) {
      if (err) { return send(res, 404); }
      if (result.type !== 'html' && result.type !== 'css' && result.type !== 'js') {
        return send(res, 404);
      }

      fs.exists(path.join(options.basePath, result.component), function (exists) {
        if (!exists) { return send(res, 404); }
        send(res, 200);
      });
    });
  };
};

module.exports = flexigin;