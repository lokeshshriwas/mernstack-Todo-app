const express = require("express");
const app = express();
const cors = require("cors")
const Todo = require("./models/todo");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/TodoMern");
}
main()
  .then(() => console.log(`db connected`))
  .catch((err) => console.log(err));

// middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

// routers

app.get("/", async (req, res) => {
  try {
    const data = await Todo.find();
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error getting todos");
  }
});

app.post("/new", async (req, res) => {
  try {
    const todo = await Todo.create({
      text: req.body.text,
    });
    res.json(todo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error creating todo");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findByIdAndDelete(id);
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error deleting todo");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Todo.findById(id);
    data.complete = !data.complete;
    data.save();
    res.json(data)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error updating todo");
  }
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
