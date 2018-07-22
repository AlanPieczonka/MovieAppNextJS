const nextSass = require('@zeit/next-sass')
const nextOptimizedImages = require('next-optimized-images')

require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = (nextConfig = {}) => {
  nextConfig.postcssLoaderOptions = Object.assign(
    {},
    nextConfig.postcssLoaderOptions,
    {
      // for now no extra configuraton for postcss
    }
  )

  nextConfig = nextSass(nextConfig)

  nextConfig = nextOptimizedImages(nextConfig)

  return Object.assign({}, nextConfig, {
    webpack (config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ]

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
