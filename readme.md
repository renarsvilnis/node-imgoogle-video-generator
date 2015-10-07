



Video generator that uses visualy chained Google image search results from [I'm Google project](http://dinakelberman.tumblr.com/). All the hard work goes to the thumblr owner Dina Kelberman.

Video generated using node.js for fetching the images and ffmpeg for compiling the video from images.

## Requirements
- [Node.js](https://nodejs.org/en/)
- [ffmpeg](https://www.ffmpeg.org/) - can be installed on OSX by `brew install ffmpeg`

## Developing
```bash
# install dependencies
npm install

# transpile code form es6 to es5
npm run build

# (option) run nodemon build instance that reload on file change
npm run start

# Compile to video
# Reference: https://trac.ffmpeg.org/wiki/Create%20a%20video%20slideshow%20from%20images
ffmpeg -framerate 10 -pattern_type glob -i 'images/original/*.jpg' -c:v libx264 -pix_fmt yuv420p out.mp4
```

