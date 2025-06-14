const mongoose = require("mongoose"); // dependency / package that is used to store data in the mongoDB database. specially design to communicate with the mongoDB server for doing CRUD operation on the database. This is required because noSQL database stores data in JSON format with any key values, mongoose on the top checks if the provided object follow the schema than only it stores the data

async function connection(dbURL) {
    // since this is connection request that will eventually takes time and hence this is an asynchronous task will be delegated to other thread
    try {
        const response = await mongoose.connect(dbURL);
        return response
    } catch(error) {
        throw error;
    }
}

// defining schema / mongoose schema
const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

// defining model from the "schema"
// Using this model we will create object that will be stored in the mongoDB as database
const Todo = mongoose.model('Todo', todoSchema); // the mongoose will use the first parameter to create the collection in the database with this name as lowercase and plural


module.exports = {
    Todo,
    connection
}


// MongoDB provides us url that points to machine that has installed noSQL database in it. there we can create create many databases that will store data in collection as json data
