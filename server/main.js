const express = require('express')
const compress = require('compression')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.config.js')
const config = require('../config.js')
const logger = require('../build/lib/logger.js')
const app = express()

app.use(compress())

if (config.env === 'development') {
    const compiler = webpack(webpackConfig)

    logger.info('Enabling webpack development and HMR middleware')
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.relative(config.basePath, config.srcDir),
        hot: true,
        quiet: false,
        noInfo: false,
        lazy: false,
        stats: 'normal'
    }))
    app.use(express.static(path.resolve(config.basePath, 'public')))
    app.use('*', function(req, res, next) {
        const filename = path.join(compiler.outputPath, 'index.html')
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if(err) {
                return next(err)
            }
            res.set('content-type', 'text/html')
            res.send(result)
            res.end()
        })
    })
}

module.exports = app