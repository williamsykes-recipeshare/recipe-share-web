import * as path from 'path';
import * as sass from 'sass';
import * as webpack from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import themeVariables from './src/theme/themeVariables';

const config : webpack.Configuration = {
    entry: {
        index: './src/Index.tsx',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
        fallback: {
            buffer: require.resolve('buffer/'),
        },
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        splitChunks: {
        chunks: 'all',
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              // cacheGroupKey here is `commons` as the key of the cacheGroup
              name(module : any, chunks : any, cacheGroupKey : any) {
                const moduleFileName = module
                  .identifier()
                  .split('/')
                  .reduceRight((item : any) => item);
                const allChunksNames = chunks.map((item : any) => item.name).join('~');
                return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
              },
              chunks: 'all',
            },
          },
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'tsx',
                        target: 'es2015'
                    }
                }],
            },
            { test: /\.css$/, use: ['style-loader','css-loader'] },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        implementation: require("sass"),
                        sassOptions: {
                            functions: {
                                'get($keys)': (args : Array<sass.Value>) => {
                                    const keysValue = args[0].assertString('keys').text;

                                    const keys = keysValue.split('.');
                                    let result : any | string = themeVariables;
                                    for (const key of keys) {
                                        result = result[key];
                                    }

                                    if (typeof result !== 'string') {
                                        return new sass.SassColor({
                                            red: 0,
                                            blue: 0,
                                            green: 0,
                                        })
                                    }

                                    return new sass.SassColor({
                                        red: Number(`0x${result.substring(1, 3)}`),
                                        green: Number(`0x${result.substring(3, 5)}`),
                                        blue: Number(`0x${result.substring(5)}`),
                                    });
                                },
                            }
                        },
                    }
                }]
            },
            {
                test: /\.(jpe?g|jpg|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['dist']}),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            favicon: 'assets/images/fav/favicon.ico',
            scriptLoading: 'defer',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from:'assets', to:'assets'
            }]
        }),
        new CopyWebpackPlugin({
            patterns:[{
            from: './assets/images/fav/favicon.ico'
        },]}),
        new webpack.DefinePlugin({
            DOCUMENT_NAME: JSON.stringify('Recipe Share'),
        }),
        new webpack.DefinePlugin({
            INDEXEDDBNAME: JSON.stringify('recipe-share-db'),
            INDEXEDDBVERSION: JSON.stringify('1'),
        }),
    ]
};

export default config;
