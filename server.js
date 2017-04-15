const express = require('express');
const path = require('path');
const app = express();

// any authentication and route handlers go above webpack configuration

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    app.use(webpackMiddleware(webpack(webpackConfig))); // uses middleware for intercepting requests coming to server
} else {
    app.use(express.static('dist')); // opens up the dist freely available for use (any file for any file)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html')); // this line is used by react router - for history
    });
}

app.listen(process.env.PORT || 3050, ()  => console.log('Listening...'));