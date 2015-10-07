'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _constants = require('./constants');

var createPageUrl = function createPageUrl(id) {
  return _url2['default'].resolve(_constants.IMAGE_URL, String(id));
};

exports.createPageUrl = createPageUrl;
var getPageHtml = function getPageHtml(url) {
  return new Promise(function (resolve, reject) {
    (0, _request2['default'])(url, {
      timeout: 10000
    }, function (err, res, html) {
      if (!err && res.statusCode === 200) {
        resolve(html);
      } else {
        reject(err);
      }
    });
  });
};

exports.getPageHtml = getPageHtml;
var getImageListFromHtml = function getImageListFromHtml(html) {
  return new Promise(function (resolve, reject) {
    var $ = _cheerio2['default'].load(html);

    var $images = $('.post .photo img');
    var images = [];

    $images.each(function () {
      var src = $(this).attr('src');
      images.push(src);
    });

    resolve(images);
  });
};

exports.getImageListFromHtml = getImageListFromHtml;

exports['default'] = function (pageId) {
  var url = createPageUrl(pageId);
  return getPageHtml(url).then(getImageListFromHtml);
};
//# sourceMappingURL=scraper.js.map