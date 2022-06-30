require('source-map-support').install();   // <= this is where the magic is done
const log4js = require('log4js');

/*
%d -> Date
%p -> level
%c -> default
%f -> filepath
%l -> line number
%m log message
 */

log4js.configure({
    appenders: {
        timeRegister: {
            type: 'console',//file || console
            filename: "c:/mitpc" + "/log/timeRegister.log",
            layout: {
                type: 'pattern', pattern: '%d %p %f:%l - %m'
            }
        }
    },
    categories: {
        default: {appenders: ['timeRegister'], level: 'info', enableCallStack: true}
    }
});
const log = log4js.getLogger();

module.exports = log;
