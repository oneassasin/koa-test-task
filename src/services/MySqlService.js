const config = require('../config');
const mysql = require('promise-mysql');
const debug = require('debug');

const log = debug('test:mysql');

class MySqlService {
    /**
     * @type {mysql.pool}
     * @private
     */
    _pool = null;

    constructor() {
        this.init().catch(err => {
            log('Error with mysql', err);
            process.exit(1);
        });
    }

    async init() {
        this._pool = await mysql.createPool(config.DB_URI);
    }

    /**
     * @returns {Promise<mysql.connection>}
     */
    async getConnection() {
        try {
            return await this._pool.getConnection();
        } catch (err) {
            log('Error with getting connection from pool', err);
            throw new Error('Database connection init error');
        }
    }
}

module.exports = MySqlService;
