import merge from 'webpack-merge';
import defaultConfig from './webpack.config';
import { DefinePlugin } from 'webpack';

export default merge(defaultConfig, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
            },
            API_URL: JSON.stringify('http://localhost:5015'),
        })
    ]
});
