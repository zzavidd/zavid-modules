const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, "./index.js"),
  output: {      
    path: path.join(__dirname, './dist'),      
    filename: 'main.js',      
    library: 'ZavidLibrary',      
    libraryTarget: 'umd',      
    publicPath: '/dist/',      
    umdNamedDefine: true  
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.*css$/,
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: ['css-loader','sass-loader'],
        })
      }
    ]
  },
  node: { fs: 'empty' },
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css' }),
  ],
  resolve: {      
    alias: {          
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),      
    },
    extensions: [".js", ".scss"]
  },  
  externals: {   
    "react": {          
        commonjs: "react",          
        commonjs2: "react",          
        amd: "React",          
        root: "React"      
    },      
    "react-dom": {          
        commonjs: "react-dom",          
        commonjs2: "react-dom",          
        amd: "ReactDOM",          
        root: "ReactDOM"      
    }  
  } 
};