'use strict';

import url from 'url';

import cheerio from 'cheerio';
import request from 'request';

import {IMAGE_URL} from './constants';

export const createPageUrl = function (id) {
  return url.resolve(IMAGE_URL, String(id));
};

export const getPageHtml = function (url) {
  return new Promise((resolve, reject) => {
    request(url, {
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

export const getImageListFromHtml = function (html) {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html);

    let $images = $('.post .photo img');
    let images = [];

    $images.each(function () {
      let src = $(this).attr('src');
      images.push(src);
    });

    resolve(images);
  });
};

export default function (pageId) {
  const url = createPageUrl(pageId);
  return getPageHtml(url)
    .then(getImageListFromHtml);
}
