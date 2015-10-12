'use strict';
import fs from 'fs';
import path from 'path';

import Canvas from 'canvas';

// https://github.com/Automattic/node-canvas
// https://github.com/Automattic/node-canvas/blob/master/examples/clock.js

const FILENAME = 'thumbnail.png';
const FILEPATH = path.join(__dirname, '..', FILENAME);

const IMG_DIMENSIONS = {
  WIDTH: 1280,
  HEIGHT: 720
};

const GRID = {
  COLUMNS: 16,
  ROWS: 10
};

/**
 * Convert canvas file to a png image
 * @param  {Canvas} canvas
 * @return {Promise}
 */
const saveToFile = function (canvas) {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(FILEPATH);
    let stream = canvas.createPNGStream();
    let err;

    stream.on('data', function (chunk) {
      file.write(chunk);
    });

    stream.on('error', function (error) {
      err = error;
    });

    stream.on('end', function () {
      if (!err) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

export default function () {
  let canvas = new Canvas(IMG_DIMENSIONS.WIDTH, IMG_DIMENSIONS.HEIGHT);
  let ctx = canvas.getContext('2d');

  // saveToFile(canvas);
}
