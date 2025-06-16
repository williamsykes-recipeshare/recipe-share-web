import merge from 'webpack-merge';
import defaultConfig from './webpack.config';
import { DefinePlugin } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default merge(defaultConfig, {
    mode: 'production',
    plugins: [
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('qa'),
            },
            API_URL: JSON.stringify('http://localhost:5015'), // TODO: Replace with QA deployed API
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from:'src/robots.txt', to:'robots.txt'
            }]
        }),
    ],
    optimization: {
        minimize: true,
        nodeEnv: 'qa',
    }
});

