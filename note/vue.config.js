module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  assetsDir: '',
  productionSourceMap: false,
  filenameHashing: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/scss/utils/vars.scss";`
      }
    },
  },

}
