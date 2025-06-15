const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const { connection } = require("./src/db/db.js");
const databaseName = "todo-end-to-end"
const dbURl = `mongodb+srv://vc160222:vc160222@cluster0.og2rnih.mongodb.net/${databaseName}`;
const todoRouter = require("./src/routes/todoRouteHandler.js");
let requestCount = 0;


// cors will now as added as a middleware that will add the lovely things that browser so that it does not cause the CORS error, this can be implemented for specific routes or doamin too that will be mention to course
app.use(cors({
  origin: "http://localhost:5173"
}))

// this is added because of tesing of the CORS error
app.use(function(req, res, next) {
  requestCount++;
  console.log(requestCount);
  next();
})

app.use(express.json()); // middleware that is used parse the json data present in the body of the request. if the body of the request does not contains valid json format data it will throw error, since this written at the top and does not contains any route this middleware will be called for all the request coming to the server.

app.use("/todos", todoRouter);


// this middle-ware is called global catch that catches the error for all the backend application
app.use(function(err, req, res, next) {
  if(err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error"
    })
    return
  }

  next();
})

app.use(function(req, res, next) {
  res.status(404).json({
    msg: "Route does not exist"
  })
  return
})


async function main() {
  try {
    const response = await connection(dbURl);
    console.log("connection is done with the database");

    app.listen(port, function() {
      console.log("server is started");
    })
  } catch(err) {
    // if the connection fails => exit the node process
    // for me 1 status code means db connection fails, this we can view inside the terminal
    console.log("connection fails with the database");
    process.exit(1);
  }
}

main();



// package.json includes all the depenedencies list that is used in the application and => using the npm install or npm i all the dependencies are bring into the system through the internet

// When creating the backend application we have to do input-validation on the data that user has sent for this we will use zod and will create types / schema / input-validator for the incoming data

// MongoDB provides the "url" that points to a machine ( in which there will be cluster that will be alloted to us ) that has implemented noSQL database, we only provide name of that database to mongoDB. we can create as many as database in that machine. In database we create collections and in collections the data gets stored in the JSON format