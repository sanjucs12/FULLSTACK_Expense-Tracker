const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./database/user");
const userController = require("./controllers/user-controller");

const app = express();
app.use(cors()); //ALLOW REQUESTS FROM ALL ORIGINS
app.use(bodyParser.json()); //PARSES THE INCOMMING REQUESTS AND STORES IT INSIDE THE BODY OBJECT

app.post("/user/sign-up", userController.addUser);

User.sync()    //{force:true}
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`ERROR : LINE 18 app.js : ERROR SYNC TO DATABASE`);
  });
