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
      "SELECT u.user_name, t.todo_id, t.description, u.user_id, u.coins FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//gained coins (watched an ad)

/*router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});*/

//change coin

router.post("/todos/", authorize, async (req, res) => {
  console.log(req.body.reward);
  try {
    const updateTodo = await pool.query(
      "UPDATE users SET coins = coins + $2 WHERE user_id = $1",
      [req.user.id, req.body.reward]
    );
  } catch (err) {
    console.error(err.message);
  }
});

//clear all coins

router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
