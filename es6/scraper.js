import url from 'url';

import cheerio from 'cheerio';
import request from 'request';
import async from 'async';

import {IMAGE_URL} from './constants';

export const createPageUrl = function(id) {
  return url.resolve(IMAGE_URL, "" + id);
};

export const getPageHtml = function(url) {
  return new Promise((resolve, reject) => {
    request(url, {
      timeout: 10000
    }, function(err, res, html) {
      if(!err && res.statusCode === 200) {
        resolve(html);
      } else {
        // TODO: error
        reject();
      }
    })
  });
};

export const getImageListFromHtml = function(html) {
  return new Promise((resolve, reject) => {
    let $ = cheerio.load(html);

    let $images = $('.post .photo img');
    let images = [];

    $images.each(function() {
      let src = $(this).attr('src');
      images.push(src);
    });

    resolve(images);
  });
};

export const downloadImages = function(images) {
  new Promise((resolve, reject) => {
    if(!images || !Array.isArray(images)) {
      // TODO: error
      reject('Invalid parameter');
    } else {
      // TODO: use each to get index
      async.parallel(images, downloadImage, function(err, files) {
        if(err) {
          reject(err);
        } else {
          resolve(err, files);
        }
      });
    }
  });
};

export const downloadImage = function(image) {
  console.log(image);
  return new Promise((resolve, reject) => {
    resolve(image);
  });
};

