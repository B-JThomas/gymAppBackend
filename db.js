require('dotenv').config()
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()


async function getDatabses() {
  try {
    const [rows] = await pool.query("SHOW DATABASES;");
    console.log(rows);
  } catch (error) {
    console.error('Error querying databases:', error);
  }
}

getDatabses();