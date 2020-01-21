import * as process from 'process';

const config = {
    DEV: {
        ENV: 'DEV',
        APP_PORT: 3000,

        DB_URI: 'mysql://mysql:mysql@localhost:3306/koa-test?connectionLimit=10',
    },
    PRODUCTION: {
        ENV: 'PRODUCTION',
        APP_PORT: parseInt(process.env.APP_PORT, 10) || 3000,

        DB_URI: process.env.DB_URI,
    },
    GLOBAL: {},
};

export default Object.assign(config[process.env.NODE_ENV || 'DEV'], config.GLOBAL);
