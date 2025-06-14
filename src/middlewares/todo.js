const { todoSchemaPost, todoSchemaPut } = require("../types/types.js");

function todoSchemaPostCheck(req, res, next) {
    const todoPayload = req.body;
    const { title, description } = todoPayload; // destructing objects

    const result = todoSchemaPost.safeParse({
        title, description
    })

    if(!result.success) {
        req.status(411).json({
            msg: "Something up with the inputs",
            issuses: result.error.issues,
        })
        return
    }

    next(); // calling the next middleware to store it in mongoDB
}

function todoSchemaPutCheck(req, res, next) {
    const todoPayload = req.body;
    const { id } = todoPayload;

    const result = todoSchemaPut.safeParse({
        id
    })

    if(!result.success) {
        res.status(411).json({
            msg: "Something up with the inputs",
            issues: result.error.issues
        })
        return
    }

    next(); // update the existing todo with that id to be mark as completed
}