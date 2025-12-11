import dotenv from 'dotenv';
dotenv.config();
const { Pool, Client } = require ('pg');


const client = new Client({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: PGDATABASE,
    port: PGPORT,
})


client.connect()
.then(() => {console.log('Connected to PostgreSQL');
    client.end();
})
.catch(err => console.error('Error connecting to the database: ', err));



const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: PGDATABASE,
    port: PGPORT,
});

module.exports = pool;