'use strict';

var endsWith = function (text, snippet) {
  return text.slice(-snippet.length) === snippet;
};

module.exports = endsWith;