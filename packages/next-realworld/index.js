const nextSass = require('@zeit/next-sass')
const nextImages = require('next-images')

module.exports = (nextConfig = {}) => {
  nextConfig.postcssLoaderOptions = Object.assign(
    {},
    nextConfig.postcssLoaderOptions,
    {
      // for now no extra configuraton for postcss
    }
  )

  nextConfig = nextSass(nextConfig)

  nextConfig = nextImages(nextConfig)

  return Object.assign({}, nextConfig, {
    webpack (config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
