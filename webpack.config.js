const path = require('path');

module.exports = {
    entry: './src/index.js', // Your entry point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '//' // Base name for the app
    },
    // Other configurations...
};