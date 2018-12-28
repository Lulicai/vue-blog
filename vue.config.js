

module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: "static",
  baseUrl: "/",
  productionSourceMap: false,
  devServer: {
    open: false,
    port: 8000,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
}