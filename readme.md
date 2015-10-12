
Project that generates a video that uses visually chained images from the [I'm Google project](http://dinakelberman.tumblr.com/). All the hard work of finding the images goes to the project author [Dina Kelberman](http://dinakelberman.com/).

Compiled video: https://vimeo.com/141656542
Hacker News entry: https://news.ycombinator.com/item?id=10338544

## Requirements
- [Node.js](https://nodejs.org/en/)
- [ffmpeg](https://www.ffmpeg.org/)
- cairo

## Usage
```bash
# install necessary dependencies
npm install

# transpile code form es6 to es5
npm run build

# (option) Run nodemon build instance that reload on file change
# Note: Only use when developing
npm run start-watch

# Fetch all images
npm run start

# Compile to video
# Reference: https://trac.ffmpeg.org/wiki/Create%20a%20video%20slideshow%20from%20images
ffmpeg -framerate 10 -pattern_type glob -i 'images/original/*.jpg' -c:v libx264 -pix_fmt yuv420p out.mp4
```

## TODO
- For the `ffmpeg` compile add pattern for png and gif images.
- Generate a `1280x720px` thumbnail from all images
- Add sound to video
