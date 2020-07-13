const winston           = require('winston');
                          require('winston-daily-rotate-file');
var moment              = require('moment');
                          require('moment-timezone');
const fs                = require("fs");

const env = process.env.NODE_ENV || "development"
const logDir = "log";

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const logger = winston.createLogger({
    level: env === "development" ? "debug" : "info", // 최소 레벨
    // 파일저장
    transports: [
        new winston.transports.DailyRotateFile({
            filename : `${logDir}/applog.log`, 
            zippedArchive: true, 
            format: winston.format.printf(
                info => `${new moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        }),
        new winston.transports.Console({
            level: "debug",
            prettyPrint: true,
            format: winston.format.printf(
                info => `${new moment().format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`)
        })
    ]
});
module.exports = logger;

