// Database: twelve_system
// Schema: twelve_sys
// Table: Auth_Uesrs
// Auth_Users Columns: id unsigned integer, username varchar, password varchar, email varchar

const pg = require('pg');
const pool = new pg.Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'twelve_system',
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});

const query = `
  CREATE TABLE IF NOT EXISTS twelve_sys."Auth_Users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );
`;

pool.query(query, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Auth_Users table created');
  }
  pool.end();
});
