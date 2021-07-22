const path = require('path');
const customDirectorySassImporter = require('./lib/customDirectorySassImporter');
const resolverPath = path.resolve(__dirname, 'lib/customDirectorySassImporter.js');

module.exports = () => {
    const env = process.env;
    const importer = customDirectorySassImporter({
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
                                implementation: require("sass"), // just to make sure :p
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