
const path = require('path')

const app = {
  // TOEDIT title
  title: 'Victoria-VR Presale',
  // TOEDIT mobile theme color
  themeColor: '#000000;'  
}

const production = process.env.NODE_ENV === 'production'
process.env.VUE_APP_NAME = app.title;

process.env.VUE_APP_API_URL = production ? '':''

const config = {    
  pluginOptions: {
    
  },
  transpileDependencies: [
    'web3modal-vue'
  ],
  pages: {
    index: {
      entry: path.resolve(__dirname, `src/main.js`),
      filename: 'index.html',
      title: app.title,
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      themeColor: app.themeColor,
    },    
  },
  configureWebpack: {
    plugins:[
      
    ],    
  },  
  productionSourceMap: false,
  devServer: {
    port: 8047,    
  },  
};

module.exports = config 


