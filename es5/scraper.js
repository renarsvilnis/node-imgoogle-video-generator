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

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _constants = require('./constants');

var createPageUrl = function createPageUrl(id) {
  return _url2['default'].resolve(_constants.IMAGE_URL, "" + id);
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
        // TODO: error
        reject();
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
var downloadImages = function downloadImages(images) {
  new Promise(function (resolve, reject) {
    if (!images || !Array.isArray(images)) {
      // TODO: error
      reject('Invalid parameter');
    } else {
      // TODO: use each to get index
      _async2['default'].parallel(images, downloadImage, function (err, files) {
        if (err) {
          reject(err);
        } else {
          resolve(err, files);
        }
      });
    }
  });
};

exports.downloadImages = downloadImages;
var downloadImage = function downloadImage(image) {
  console.log(image);
  return new Promise(function (resolve, reject) {
    resolve(image);
  });
};
exports.downloadImage = downloadImage;
//# sourceMappingURL=scraper.js.map