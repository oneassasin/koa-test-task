import config from '../src/config';
import * as mysql from 'mysql';
import migration from 'mysql-migrations';

const connection = mysql.createPool(config.DB_URI);

migration.init(connection, '.');
