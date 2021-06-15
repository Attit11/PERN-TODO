const express = require("express");

const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//CREATE A TODO

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    res.status(401).send(error);
  }
});

//GET ALL TODOS

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET A TODO

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id= $1", [id]);
    res.json(todo.rows);
  } catch (error) {
    res.status(404).send(error);
  }
});

//UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todo was updated!");
  } catch (error) {
    res.status(404).send(error);
  }
});

//DELETE A TODO

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todo WHERE todo_id= $1", [id]);
    res.json("Todo wad Deleted!");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
