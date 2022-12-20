const inclusiveLangPlugin = require('@11ty/eleventy-plugin-inclusive-language')
const imagePlugin = require('@11ty/eleventy-img')
const faviconsPlugin = require('eleventy-plugin-gen-favicons')
const embedYouTubePlugin = require('eleventy-plugin-youtube-embed')
const heroIconPlugin = require('eleventy-plugin-heroicons')

async function imageShortcode (src, alt, sizes) {
  let metadata = await imagePlugin(src, {
    widths: [640, 600],
    formats: ['avif', 'png', 'svg'],
    outputDir: './_site/img/'
  })

  let imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async'
  }

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return imagePlugin.generateHTML(metadata, imageAttributes)
}

module.exports = config => {
  config.addPlugin(inclusiveLangPlugin)
  config.addPlugin(faviconsPlugin, {})
  config.addPlugin(embedYouTubePlugin, {
    lite: true
  })
  config.addPlugin(heroIconPlugin, {
    errorOnMissing: true
  })

  config.addNunjucksAsyncShortcode('image', imageShortcode)
  config.addLiquidShortcode('image', imageShortcode)
  config.addJavaScriptFunction('image', imageShortcode)

  return {
    dir: {
      input: 'src',
      output: '_site'
    }
  }
}
