var winston =  require('winston')
var config = require('../../config/config')
var fs = require('fs')
var rfs = require('rotating-file-stream')
var moment = require('moment-timezone')
var getNamespace = require('cls-hooked').getNamespace

var LOG_DIRECTORY = config.logPath || process.env.LOG_DIRECTORY || 'logs'
var LOG_FILE_BASE = process.env.LOG_FILE_BASE || 'we-shopify-app'

fs.existsSync(LOG_DIRECTORY) || fs.mkdirSync(LOG_DIRECTORY)
var logStream = rfs(LOG_FILE_BASE + '.log', {
    interval: '1d',
    path: LOG_DIRECTORY,
    compress: 'gzip',
    maxFiles: 3
})

var logger = null
if (process.env.APP_PLATFORM === 'k8s') {
    logger = new(winston.Logger)({
        transports: [
            new(winston.transports.Console)({
                name: 'console',
                level: config.logLevel,
                json: false,
                timestamp: function() {
                    return new Date().toISOString()
                },
                formatter: function(options) {
                    var cache = []
                    return [moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss,SSS ZZ'), options.level.toUpperCase(), (undefined !== options.message ? options.message : '')].join('\t') +
                        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta, function (key, value) {
                            if (typeof value === 'object' && value !== null) {
                                if (cache.indexOf(value) !== -1) {
                                    // Circular reference found, discard key
                                    return
                                }
                                // Store value in our collection
                                cache.push(value)
                            }
                            return value
                        }) : '')
                },
                handleExceptions: true,
                humanReadableUnhandledException: true,
                depth: 7
            })
        ]
    })
} else {
    logger = new(winston.Logger)({
        transports: [
            new(winston.transports.File)({
                name: 'dailyRotateFile',
                level: config.logLevel,
                json: false,
                timestamp: function() {
                    return new Date().toISOString()
                },
                stream: logStream,
                formatter: function(options) {
                    var cache = []
                    return [moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss,SSS ZZ'), options.level.toUpperCase(), (undefined !== options.message ? options.message : '')].join('\t') +
                        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta, function (key, value) {
                            if (typeof value === 'object' && value !== null) {
                                if (cache.indexOf(value) !== -1) {
                                    // Circular reference found, discard key
                                    return
                                }
                                // Store value in our collection
                                cache.push(value)
                            }
                            return value
                        }) : '')
                },
                handleExceptions: true,
                humanReadableUnhandledException: true,
                depth: 7
            })
        ]
    })
}

var formatMessage = function (message) {
    var httpContext = getNamespace('requestNamespace')
    var reqId = httpContext && httpContext.get('reqId') ? httpContext.get('reqId') : 'NA'
    var path = httpContext && httpContext.get('path') ? httpContext.get('path') : 'NA'
    return [reqId, path, message].join('\t')
}


var wrap = {
    error: function (message, meta) {
        logger.error(formatMessage(message), meta)
    },
    warn: function (message, meta) {
        logger.warn(formatMessage(message), meta)
    },
    verbose: function (message, meta) {
        logger.verbose(formatMessage(message), meta)
    },
    info: function (message, meta) {
        logger.info(formatMessage(message), meta)
    },
    debug: function (message, meta) {
        logger.debug(formatMessage(message), meta)
    },
    silly: function (message, meta) {
        logger.silly(formatMessage(message), meta)
    },
    changeLevel: function (level) {
		if (process.env.APP_PLATFORM === 'k8s') {
            logger.transports.console.level = level
            logger.level = level
        } else if (logger.transports && logger.transports.dailyRotateFile) {
            logger.transports.dailyRotateFile.level = level
            logger.level = level
        }
        logger.level = level
    }
}

module.exports = wrap
