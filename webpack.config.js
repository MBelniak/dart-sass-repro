const path = require('path');
const customerDirectoryInSourcesSassImporter = require('./lib/customer-directory-in-sources-resolver');
const resolverPath = path.resolve(__dirname, 'lib/customer-directory-in-sources-resolver.js');

module.exports = () => {
    const env = process.env;
    const importer = customerDirectoryInSourcesSassImporter({
        cssDir: env.CSSDIRNAME,
        rootDirectory: path.resolve(__dirname, "src")
    });
    
    importer.__expression = `require("${resolverPath}")(${JSON.stringify(
        {
            cssDir: env.CSSDIRNAME,
            rootDirectory: path.resolve(__dirname, "src")
        },
        null,
        2
    )})`;
    plugins: [
        isProduction &&
          new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
            chunkFilename: "assets/css/[name].[contenthash:8].chunk.css"
          }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "public/index.html"),
          inject: true
        }),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify(
            isProduction ? "production" : "development"
          )
        })
      ].filter(Boolean),
    return {
        mode: env.production ? 'production' : 'development',
        target: 'web',
        entry: {
            app: path.resolve(__dirname, 'src/app.jsx'),
        },
        node: false,
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json', '.scss']
        },
        externals: ['react', 'react-dom'],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    "@babel/preset-react"
                                ]
                            }
                        },
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'global',
                                    localIdentName: '[local]--[hash:base64:5]'
                                },
                                localsConvention: 'camelCase',
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    importer
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
};