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
      "SELECT * FROM trees"
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


//giving the user a tree
router.post("/trees", authorize, async (req, res) => {
  try {
    console.log(req.body.id);

    const coins = await pool.query(
      "SELECT coins FROM users WHERE user_id = $1",
      [req.user.id]
    )
    if (coins.rows[0].coins >= req.body.cost) {
      const newUserTree = await pool.query(
        "INSERT INTO user_trees (tree_id, user_id, level, time) VALUES ($1, $2, $3, current_timestamp) RETURNING *",
        [req.body.id, req.user.id, 1]
      )

      const coinRemoval = await pool.query(
        "UPDATE users SET coins = coins - $2 WHERE user_id = $1",
        [req.user.id, req.body.cost]
      )

      res.json(newUserTree.rows[0]);
    }
    else {
      res.json("no money");
    }
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
