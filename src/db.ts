// get the client
const mysql = require('mysql2');
const config = require('config');

// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
  host: config.get('database.host'),
  user: config.get('database.userName'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  port: config.get('database.port'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;

