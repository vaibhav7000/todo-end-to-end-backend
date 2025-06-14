const z = require("zod");

/*
    post request input send in the body as json format data
    {
        title: String,
        description: String
    }
*/

const todoSchemaPost = z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1)
})

/* 
    put request input send in the body
    {
        todoId: String
    }

*/

const todoSchemaPut = z.object({
    todoId: z.string().trim().min(1)
})


module.exports = {
    todoSchemaPost, todoSchemaPut
}