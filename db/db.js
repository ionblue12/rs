require('dotenv').config();
const { Pool } = require ('pg');
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: PGDATABASE,
    port: PGPORT,
})
pool.connect()
.then(() => console.log('Connected to PostgreSQL'))
.catch(err => console.error('Error connecting to the database: ', err));
module.exports = pool;