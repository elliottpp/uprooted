const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Epicgamerman1964$!&*",
  port: 5432,
  database: "authtodolist"
});

module.exports = pool;
