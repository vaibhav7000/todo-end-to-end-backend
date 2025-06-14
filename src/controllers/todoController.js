const mongoose = require("mongoose")
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
        console.log("error occured when add todo to database")
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
        console.log("error occured when getting all todos")
        next(err);
    }
}

async function updateTodoById(req, res, next) {
    const { id } = req.body;

    // know checking if the id provided follows the exact ObjectID syntax that is added by the mongoose when adding the json data to the database
    if(!mongoose.isValidObjectId(id)) {
        res.status(411).json({
            msg: "Invalid id sent"
        })

        return
    }

    // finding and updating the todo
    try {
        // there is 2 syntax to update the todo 

        // better syntax
        const updatedTodo = await Todo.findByIdAndUpdate(id, {
            $set: {
                completed: true
            } 
        }, {
            new: true, // returns the updated object
            runValidators: true
        }) // Runs as a single atomic operation in MongoDB,

        // syntax 2
        // const updatedTodo1 = await Todo.updateMany({
        //     _id: id
        // }, {
        //     completed: true
        // })


        res.status(200).json({
            msg: "Todo updated",
            updatedTodo
        })
    } catch {
        next(err);
    }
}


module.exports = {
    addTodoToDB, getAllTodos, updateTodoById
}

// In mongoDB the documents are stored with _id as uniquer identifier