require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("connect", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("🚀 Database connected!");
    }
});

module.exports = pool;
