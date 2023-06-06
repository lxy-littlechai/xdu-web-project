module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // 是否允许跨域
        changeOrigin: true,
        secure: true, // 如果是https接口，需要配置这个参数
        //ws: true, //如果要代理 websockets，配置这个参数
        pathRewrite: {
          '^/api': '/'
        }
      },
      /*       'https://imgloc.com/api/1/upload': {
              target: 'https://imgloc.com/api/1/upload',
              changeOrigin: true,
              secure: true
            } */
    }
  }
}