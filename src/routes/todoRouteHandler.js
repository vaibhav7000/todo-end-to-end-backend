const express = require("express");
const { Router }  = express;
const router = Router();
const { todoSchemaPostCheck } = require("../middlewares/todo.js");
const { addTodoToDB, getAllTodos } = require("../controllers/todoController.js");

router.post("/addTodo", todoSchemaPostCheck, addTodoToDB);

router.get("/allTodo", getAllTodos);

module.exports = router;