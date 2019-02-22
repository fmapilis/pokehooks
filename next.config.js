module.exports = {
  onDemandEntries: {
    maxInactiveAge: 30 * 1000,
    pagesBufferLength: 1,
    websocketPort: 34801
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
}
