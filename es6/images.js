'use strict';
import fs from 'fs';
import path from 'path';

import request from 'request';
import async from 'async';
import mkdirp from 'mkdir-promise';
import del from 'del';
import zpad from 'zpad';

import {IMAGE_DIR, IMAGE_DIR_ORIGINAL, IMAGE_DIR_RESIZED} from './constants';

export function deleteImagesFolder () {
  return new Promise((resolve, reject) => {
    del(IMAGE_DIR).then(resolve).catch(reject);
  });
}

export function createImagesFolder () {
  return mkdirp(IMAGE_DIR_ORIGINAL)
    .then(function () {
      return mkdirp(IMAGE_DIR_RESIZED);
    });
}

const downloadImage = function (imageOffset, image, index, callback) {
  const fileExtension = image.split('.').pop();

  if (!fileExtension) {
    callback(new TypeError('Missing image extension'));
    return;
  }

  let imageNr = imageOffset + parseInt(index, 10);

  // add zeropadding to make the file index be atleast 6 digit long
  imageNr = zpad(imageNr, 6);

  const filename = `image-${imageNr}.${fileExtension}`;
  const filepath = path.join(IMAGE_DIR_ORIGINAL, filename);
  let err;

  request(image)
    .on('response', function (res) {
      if (res.statusCode === 200) {
        this.pipe(fs.createWriteStream(filepath));
      } else {
        err = new Error('Issue while getting image');
      }
    }).on('end', function () {
      callback(err, filepath);
    });
};

export function downloadImages (imageOffset = 0, images) {
  return new Promise((resolve, reject) => {
    if (!images || !Array.isArray(images)) {
      reject(new TypeError('Missing images array'));
      return;
    }

    // convert array to object so that async.forEachOfSeries can be used
    // to get key
    let imagesObj = images.reduce(function (o, v, i) {
      o[i] = v;
      return o;
    }, {});

    async.forEachOfSeries(imagesObj, downloadImage.bind(null, imageOffset), function (err, files) {
      if (!err) {
        resolve(files);
      } else {
        reject(err);
      }
    });
  });
}
