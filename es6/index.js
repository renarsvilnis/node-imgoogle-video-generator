'use strict';

import promiseWaterfall from 'promise-waterfall';

import {PAGE_RANGE} from './constants.js';
import scraper from './scraper';
import {deleteImagesFolder, createImagesFolder, downloadImages} from './images';

let getImages = function () {
  return deleteImagesFolder()
    .then(createImagesFolder)
    .then(getImagesOfPages);
};

let getImagesOfPages = function () {
  let promises = [];

  for (let i = PAGE_RANGE.MIN; i <= PAGE_RANGE.MAX; i++) {
    console.log('Getting images for page', i);
    let promise = getImagesOfPage.bind(null, i);
    promises.push(promise);
  }

  return promiseWaterfall(promises);
};

let getImagesOfPage = function (id, imageOffset = 0) {
  return scraper(id)
    .then(function (list) {
      let promise = downloadImages(imageOffset, list);
      imageOffset += list.length;
      return promise;
    })
    .then(function () {
      return imageOffset;
    })
    .catch(function (err) {
      console.log(err.stack);
    });
};

getImages();
