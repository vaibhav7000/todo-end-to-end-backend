const express = require("express");
const app = express();
const port = 3000;
const { connection } = require("./src/db/db.js");
const dbURl = "mongodb+srv://vc160222:vc160222@cluster0.og2rnih.mongodb.net/";

app.use(express.json()); // middleware that is used parse the json data present in the body of the request. if the body of the request does not contains valid json format data it will throw error, since this written at the top and does not contains any route this middleware will be called for all the request coming to the server.




// this middle-ware is called global catch that catches the error for all the backend application
app.use(function(err, req, res, next) {
  if(err) {
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


app.listen(port, async function() {
  console.log("server started")
  try {
    // calling the connection request to the database
      const response = await connection(dbURl);
      console.log(response);
      console.log("connection is done with the database");
  } catch(err) {
    // if the connection fails => exit the node process
    // for me 1 status code means db connection fails, this we can view inside the terminal
    console.log("connection fails with the database");
    process.exit(1);
  }
})


// package.json includes all the depenedencies list that is used in the application and => using the npm install or npm i all the dependencies are bring into the system through the internet

// When creating the backend application we have to do input-validation on the data that user has sent for this we will use zod and will create types / schema / input-validator for the incoming data