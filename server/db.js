const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Thinkpad@11",
  host: "localhost",
  port: 5434,
  database: "perntodo",
});

module.exports = pool;
