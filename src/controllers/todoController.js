const { Todo } = require("../db/db.js");

// adding logic to add to the databse

async function addTodoToDB(req, res, next) {
    const { title, description } = req.body;

    const finalTodo = new Todo({
        title: title, 
        description: description
    })

    try {
        const response = await finalTodo.save(finalTodo); // this after saving returns the same todo but with _id that mongoDB provide to track the json data
        console.log(response);

        res.status(200).json({
            msg: "Todo created",
            response
        })
    } catch(error) {
        // either call the global catch function or send response according to what happens
        next(error);
    }
}

async function getAllTodos(req, res, next) {
    try {
        // "find" method for particular model gets all data present inside  the collection as array
        const response = await Todo.find();

        res.status(200).json({
            msg: "all todos are send",
            todos: response
        })
    } catch(err) {
        next(err);
    }
}


module.exports = {
    addTodoToDB, getAllTodos
}