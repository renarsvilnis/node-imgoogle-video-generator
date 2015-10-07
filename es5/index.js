'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _promiseWaterfall = require('promise-waterfall');

var _promiseWaterfall2 = _interopRequireDefault(_promiseWaterfall);

var _constantsJs = require('./constants.js');

var _scraper = require('./scraper');

var _scraper2 = _interopRequireDefault(_scraper);

var _images = require('./images');

var getImages = function getImages() {
  return (0, _images.deleteImagesFolder)().then(_images.createImagesFolder).then(getImagesOfPages);
};

var getImagesOfPages = function getImagesOfPages() {
  var promises = [];

  for (var i = _constantsJs.PAGE_RANGE.MIN; i <= _constantsJs.PAGE_RANGE.MAX; i++) {
    console.log('Getting images for page', i);
    var promise = getImagesOfPage.bind(null, i);
    promises.push(promise);
  }

  return (0, _promiseWaterfall2['default'])(promises);
};

var getImagesOfPage = function getImagesOfPage(id) {
  var imageOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  return (0, _scraper2['default'])(id).then(function (list) {
    var promise = (0, _images.downloadImages)(imageOffset, list);
    imageOffset += list.length;
    return promise;
  }).then(function () {
    return imageOffset;
  })['catch'](function (err) {
    console.log(err.stack);
  });
};

getImages();
//# sourceMappingURL=index.js.map