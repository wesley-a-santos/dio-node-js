// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const db = mysql.createPool({
  host: 'localhost',
  user: 'wesley',
  password: 'Sophi@2601',
  database: 'dio-node-js',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const encryptKey = 'X6yrbMtYn5dEUgmQ';

export default db;

