import merge from 'webpack-merge';
import defaultConfig from './webpack.config';
import { DefinePlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default merge(defaultConfig, {
    mode: 'production',
    plugins: [
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            },
            API_URL: JSON.stringify('https://recipesharewebapi-a8fgg5atajb0gvdr.southafricanorth-01.azurewebsites.net'),
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from:'src/robots.txt', to:'robots.txt'
            }]
        }),
    ],
    optimization: {
        minimize: true,
        nodeEnv: 'production',
    }
});

