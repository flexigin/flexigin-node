'use strict';

var fs = require('fs'),
    path = require('path');

var async = require('async');

var endsWith = require('./endsWith'),
    startsWith = require('./startsWith');

var send = function (res, statusCode, type, componentDirectory) {
  if (!type) {
    res.writeHead(statusCode);
    res.end();
    return;
  }

  res.writeHead(statusCode, {
    'content-type':
      type === 'html' ? 'text/html' :
      type === 'css' ? 'text/css' :
      type === 'js' ? 'text/javascript' :
      ''
  });
  fs.readdir(componentDirectory, function (err, files) {
    async.eachSeries(files, function (file, callback) {
      if (!endsWith(file, '.' + type)) { return callback(); }

      var currentFile = path.join(componentDirectory, file);
      fs.stat(currentFile, function (err, stats) {
        if (stats.isDirectory()) { return callback(); }

        var stream = fs.createReadStream(currentFile).on('end', function () {
          callback();
        });
        stream.pipe(res, { end: false });
      });
    }, function () {
      res.end();
    });
  });
};

var flexigin = function (options) {
  if (!options) { throw new Error('options are missing.'); }
  if (!options.baseUrl) { throw new Error('options.baseUrl is missing.'); }
  if (!options.basePath) { throw new Error('options.basePath is missing.'); }

  var urlTokenizer = require('./urlTokenizer')(options.baseUrl);

  return function (req, res, next) {
    if (!startsWith(req.url, options.baseUrl)) { return next(); }

    urlTokenizer(req.url, function (err, result) {
      if (err) { return send(res, 404); }
      if (result.type !== 'html' && result.type !== 'css' && result.type !== 'js') {
        return send(res, 404);
      }

      var componentDirectory = path.join(options.basePath, result.component);
      fs.exists(componentDirectory, function (exists) {
        if (!exists) { return send(res, 404); }
        send(res, 200, result.type, componentDirectory);
      });
    });
  };
};

module.exports = flexigin;