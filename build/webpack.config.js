const path = require('path')
const webpack = require('webpack')
const config = require('../config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const basePath = path.resolve.bind(path, config.basePath)
const sourcePath = (file) => basePath(config.srcDir, file)

const __DEV__ = config.env === 'development'
const __PROD__ = config.env === 'production'

const configuration = {
    entry: {
        main: [
            sourcePath(config.main),
        ],
    },
    devtool: 'source-map',
    output: {
        path: basePath(config.outDir),
        filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
        publicPath: config.publicPath
    },
    resolve: {
        modules: [
            'node_modules',
            basePath(config.srcDir)
        ],
        extensions: [".js", ".json", ".scss", ".css"],
        alias: {
            observer: sourcePath('observer'),
            DOMManipulations: sourcePath('DOMManipulations'),
            helpers: sourcePath('helpers'),
            models: sourcePath('models'),
            asyncDataStorage: sourcePath('asyncDataStorage'),
            components: sourcePath('components'),
            validation: sourcePath('validation')
        }
    },
    externals: {},
    module: {
        rules: []
    },
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            'process.env': { NODE_ENV: JSON.stringify(config.env) },
            __DEV__,
            __PROD__,
        }, config.globals))
    ],
}

configuration.module.rules.push({
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
        query: {
            cacheDirectory: true,
            presets: [
                ['babel-preset-env', {
                    modules: false,
                    targets: {
                        ie9: true,
                    },
                    uglify: true,
                }],
            ]
        },
    }],
})


const extractStyles = new ExtractTextPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    disable: __DEV__
})

configuration.module.rules.push({
    test: /\.(sass|scss)$/,
    loader: extractStyles.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    minimize: {
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions']
                        },
                        discardComments: {
                            removeAll: true
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourcemap: true
                    }
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                    includePaths: [
                        sourcePath('styles'),
                        'node_modules'
                    ]
                }
            }
        ]
    })
})

configuration.plugins.push(extractStyles)

configuration.module.rules.push({
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader',
    options: {
        limit: 8192
    }
})

    ;[
        ['woff', 'application/font-woff'],
        ['woff2', 'application/font-woff2'],
        ['otf', 'font/opentype'],
        ['ttf', 'application/octet-stream'],
        ['eot', 'application/vnd.ms-fontobject'],
        ['svg', 'image/svg+xml'],
    ].forEach((font) => {
        const extension = font[0]
        const mimetype = font[1]

        configuration.module.rules.push({
            test: new RegExp(`\\.${extension}$`),
            loader: 'url-loader',
            options: {
                name: 'fonts/[name].[ext]',
                limit: 10000,
                mimetype,
            },
        })
    })


configuration.plugins.push(new HtmlWebpackPlugin({
    template: sourcePath('index.html'),
    inject: true,
    minify: {
        collapseWhitespace: true,
    },
}))

if (__DEV__) {
    configuration.plugins.push(
        new webpack.NamedModulesPlugin()
    )
}

if (__PROD__) {
    configuration.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: !!config.devtool,
            comments: false,
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            }
        })
    )
}

module.exports = configuration