const express = require("express");
const { Router }  = express;
const router = Router();
const { todoSchemaPostCheck } = require("../middlewares/todo.js");
const { addTodoToDB, getAllTodos, updateTodoById, getSpecificTodoDetails } = require("../controllers/todoController.js");

router.post("/addTodo", todoSchemaPostCheck, addTodoToDB);

router.get("/allTodo", getAllTodos);

router.put("/updateTodo", updateTodoById);

router.get("/todoDetails", getSpecificTodoDetails);

module.exports = router;