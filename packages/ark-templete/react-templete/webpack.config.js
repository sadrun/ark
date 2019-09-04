const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const WebpackBar = require('webpackbar');

const APP_PATH = path.resolve(__dirname, "./src");
const DIST_PATH = path.resolve(__dirname, "./dist");
const devMode = process.env.NODE_ENV !== 'production'

const TempleteConfig = [
    new HtmlWebpackPlugin({
        filename:'index.html',
        template: "public/index.html",
        hash: false,
        minify: {
            // html5: true,
            // collapseWhitespace: true,
            // preserveLineBreaks: false,
            // minifyCSS: true,
            // minifyJS: true,
            // removeComments: false,
        },
    }),
]

const config = {
    entry: {
      main: APP_PATH + "/index.js"
    },
    output: {
      filename: "[name].[hash:8].js",
      chunkFilename: '[name].[hash:8].js',
      publicPath:'/',
      path: DIST_PATH
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: "thread-loader",
              // 有同样配置的 loader 会共享一个 worker 池(worker pool)
              options: {
                // 产生的 worker 的数量，默认是 cpu 的核心数
                //workers: 2,
                // 一个 worker 进程中并行执行工作的数量
                // 默认为 20
                //workerParallelJobs: 50,
          
                // 额外的 node.js 参数
                //workerNodeArgs: ['--max-old-space-size', '1024'],
          
                // 闲置时定时删除 worker 进程
                // 默认为 500ms
                // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
                //poolTimeout: 2000,
          
                // 池(pool)分配给 worker 的工作数量
                // 默认为 200
                // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
                //poolParallelJobs: 50,
          
                // 池(pool)的名称
                // 可以修改名称来创建其余选项都一样的池(pool)
                name: "my-pool"
              }
            },
            "babel-loader"
          ],
          exclude: /node_modules/,
          include: APP_PATH
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode
              }
            },
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.less$/,
          exclude: /node_modules/,
          use: [
            //devMode ? 'style-loader' :  MiniCssExtractPlugin.loader, //如果需要css热更新，需要用style-loader
            // 经验证，mini-css-extract-plugin也可以开启热更新
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode, //仅在dev模式下开启
              }
            },
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")()]
              }
            },
            {
              loader: "less-loader",
              options: {
                modifyVars: {
                  // 自定义的主题内容写在这里
                }
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|jpeg|bmp|webp)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                publicPath: "/",
                name: "images/[name].[ext]",
                limit: 10240
              }
            }
          ]
        },
        {
          test: /\.(woff|svg|eot|woff2|tff)$/,
          use: "file-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts",".tsx"],
      alias: {
        "@": APP_PATH
      }
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 30000,
            minChunks: 1,
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    test: /node_modules/, // 指定是node_modules下的第三方包
                    chunks: 'all',
                    name: 'vendor', // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                common: {
                    // 抽离自己写的公共代码，common里面是一个公共类库
                    chunks: 'all',
                    name: 'common', // 任意命名
                    minSize: 0 // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    plugins: [
      new WebpackBar(),
      new webpack.DefinePlugin({
        __isBrowser__: JSON.stringify(true),
      }),
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "./public"),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
        open: true,
        proxy: {},
        inline: true
    }
};

if(devMode) {
    config.plugins = config.plugins.concat(TempleteConfig);
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].css"
      }),
    );
    config.mode = "development";
    config.devtool = 'inline-cheap-module-source-map';
}else {
    config.plugins = config.plugins.concat(TempleteConfig);
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "[name].[hash:8].css",
          ignoreOrder: false
        }),
    );
    config.mode = "production";
}

module.exports = config;