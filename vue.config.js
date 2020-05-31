const webpack = require('webpack')
module.exports = {
  configureWebpack: {

    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",

        jQuery:"jquery",
        "windows.jQuery":"jquery"
      })
    ],
    resolve:{
      extensions: ['.js', '.vue', '.json'],
      alias:{
        '@':'src',
        '@assets':'@/assets',
        '@common':'@/common',
        '@components':'@/components',
        '@network':'@/network',
        '@views':'@/views'
      },
      // externals: {
      //   "BMap": "BMap"
      // }
      //加了会报错，并不知道为什么
    }
  }
  // ,

  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "~@/assets/scss/style.scss";`
  //     }
  //   }
  // }
}
