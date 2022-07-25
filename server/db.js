const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Epicgamerman2005",
  port: 5432,
  database: "uprooted"
});

module.exports = pool;
