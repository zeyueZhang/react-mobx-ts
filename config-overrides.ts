const { 
  override, 
  fixBabelImports, 
  addLessLoader, 
  addWebpackAlias,
  addBabelPlugins, // babel插件配置函数
} = require('customize-cra');
const path = require("path");

const rewireRemoveConsolePlugin = require('./react-app-rewired-packages/react-app-rewire-remove-console.ts')

module.exports = override(
  // 按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // 启用less
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#1DA570" },
    localIdentName: "[local]--[hash:base64:5]"
  }),
  //别名配置
  addWebpackAlias({        
    ["@"]: path.resolve(__dirname, "./src"),             
    ["@pages"]: path.resolve(__dirname, "./src/pages"),
    ["@components"]: path.resolve(__dirname, "./src/components"),   
    ["@models"]: path.resolve(__dirname, "./src/models")
  }),
  // 支持装饰器
  ...addBabelPlugins(
    [
      '@babel/plugin-proposal-decorators',
      { legacy: true }
    ],
    rewireRemoveConsolePlugin()
  ),
);