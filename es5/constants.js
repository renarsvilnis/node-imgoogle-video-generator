'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var IMAGE_URL = 'http://dinakelberman.tumblr.com/page/';
exports.IMAGE_URL = IMAGE_URL;
var PAGE_RANGE = {
  MIN: 0,
  MAX: 166
};

exports.PAGE_RANGE = PAGE_RANGE;
var IMAGE_DIR = _path2['default'].join(__dirname, '..', 'images');
exports.IMAGE_DIR = IMAGE_DIR;
var IMAGE_DIR_ORIGINAL = _path2['default'].join(IMAGE_DIR, 'original');
exports.IMAGE_DIR_ORIGINAL = IMAGE_DIR_ORIGINAL;
var IMAGE_DIR_RESIZED = _path2['default'].join(IMAGE_DIR, 'resized');
exports.IMAGE_DIR_RESIZED = IMAGE_DIR_RESIZED;
//# sourceMappingURL=constants.js.map