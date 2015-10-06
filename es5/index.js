'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _constantsJs = require('./constants.js');

var _scraper = require('./scraper');

var getImagesOfPage = function getImagesOfPage(id) {
  var url = (0, _scraper.createPageUrl)(id);

  (0, _scraper.getPageHtml)(url).then(_scraper.getImageListFromHtml).then(_scraper.downloadImages).then(function (list) {
    console.log(list);
  })['catch'](function (err) {
    console.log('Error', err);
  });
};

getImagesOfPage(1);
//# sourceMappingURL=index.js.map