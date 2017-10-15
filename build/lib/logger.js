const chalk = require('chalk')
const figures = require('figures')

const spread = (fn) => function () {
    return fn([].slice.call(arguments))
}

exports.log = console.log.bind(console)

const error = function(messages) {
    console.error(chalk.red.apply(chalk, [figures.cross].concat(messages)))
}
const info = function(messages) {
    console.log(chalk.cyan.apply(chalk, [figures.info].concat(messages)))
}

const success = function(messages) {
    console.log(chalk.green.apply(chalk, [figures.tick].concat(messages)))
}

const warn = function(messages) {
    console.warn(chalk.yellow.apply(chalk, [figures.warning].concat(messages)))
}

exports.log = console.log.bind(console)
exports.error = spread(error)
exports.info = spread(info)
exports.success = spread(success)
exports.warn = spread(warn)