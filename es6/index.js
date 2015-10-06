import fs from 'fs';

import {PAGE_RANGE} from './constants.js';
import {createPageUrl, getPageHtml, getImageListFromHtml, downloadImages} from './scraper';

let getImagesOfPage = function(id) {
  const url = createPageUrl(id);

  getPageHtml(url)
    .then(getImageListFromHtml)
    .then(downloadImages)
    .then(function(list) {
      console.log(list);
    })
    .catch(function(err) {
      console.log('Error', err);
    });
};

getImagesOfPage(1);
