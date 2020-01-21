import config from '../config';
import * as mysql from 'promise-mysql';
import * as debug from 'debug';

const log = debug('test:app');

export default class MySqlService {
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
        return this._pool.getConnection();
    }
}
