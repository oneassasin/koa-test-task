const process = require('process');

const config = {
    DEV: {
        ENV: 'DEV',
        APP_PORT: 3000,

        DB_URI: 'mysql://user:password@localhost:3306/koa-test?connectionLimit=10',
    },
    PRODUCTION: {
        ENV: 'PRODUCTION',
        APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,

        DB_URI: process.env.DB_URI,
    },
    GLOBAL: {},
};

module.exports = Object.assign(config[process.env.NODE_ENV || 'DEV'], config.GLOBAL);
