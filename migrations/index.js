const config = require('../src/config');
const mysql = require('mysql');
const migration = require('mysql-migrations');

const connection = mysql.createPool(config.DB_URI);

migration.init(connection, __dirname);
