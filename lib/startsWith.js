'use strict';

var startsWith = function (text, snippet) {
  return text.slice(0, snippet.length) === snippet;
};

module.exports = startsWith;