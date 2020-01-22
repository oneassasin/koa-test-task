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

    async init() {
        if (this._pool) {
            return;
        }

        try {
            this._pool = await mysql.createPool(config.DB_URI);
        } catch (err) {
            log('Error with pool init', err);
            throw new Error('Database connection init error');
        }
    }

    /**
     * @returns {Promise<mysql.connection>}
     */
    async getConnection() {
        await this.init();

        try {
            return await this._pool.getConnection();
        } catch (err) {
            log('Database getting connection error', err);
            throw new Error('Database getting connection error');
        }
    }

    /**
     * @param connection {mysql.connection}
     * @returns {Promise<void>}
     */
    async releaseConnection(connection) {
        try {
            await this._pool.releaseConnection(connection);
        } catch (err) {
            log('Database release connection error', err);
            throw new Error('Database release connection error');
        }
    }
}

module.exports = MySqlService;
