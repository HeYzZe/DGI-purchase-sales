// vue.config.js
module.exports = {

  // 部署应用的基础URL: String '/'
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',

  // 运行时将生成构建文件的目录: String
  // outputDir: 'dist',

  // 相对于 outputDir 生成的静态目录
  // assetsDir: '',

  // 指定生成的输出路径, 相对于outputDir: String
  // indexPath: 'index.html'

  // 是否使用ESList: Boolean true
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否需要生产源映射: Boolean true
  productionSourceMap: false,

  // 开发服务配置
  devServer: {
    host: '0.0.0.0',
    port: 8080,         // 端口号
    https: false,       // https: Boolean
    open: true,        // 自动启动浏览器
    proxy: {
      // 常规接口
      '/api': {
        target: 'http://192.168.6.182:9004/',
        changeOrigin: false,
        autoRewrite: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
      // 权限接口
      '/auth': {
        target: 'http://192.168.6.182:9004/auth/',
        changeOrigin: true,
        autoRewrite: true,
        pathRewrite: {
          '^/auth': '',
        },
      },
      // 系统接口
      '/sys': {
        target: 'http://192.168.6.182:9004/sys/',
        changeOrigin: true,
        autoRewrite: true,
        pathRewrite: {
          '^/sys': '',
        },
      },
      // 存储接口
      '/storage': {
        target: 'http://192.168.6.182:9004/',
        changeOrigin: true,
        pathRewrite: {
          '^/storage': '/storage',
        },
      },
    },
    disableHostCheck: true,
  },
};
