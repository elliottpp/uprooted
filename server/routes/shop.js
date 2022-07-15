const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

//all todos and name

router.get("/", authorize, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT * FROM shop",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
