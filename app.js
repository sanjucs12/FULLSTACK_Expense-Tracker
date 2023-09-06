const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./backend/database/user");
const userController = require("./backend/controllers/user-controller");

const app = express();
app.use(cors()); //ALLOW REQUESTS FROM ALL ORIGINS
app.use(bodyParser.json()); //PARSES THE INCOMMING REQUESTS AND STORES IT INSIDE THE BODY OBJECT

app.post("/user/sign-up", userController.signUp);
app.post("/user/login", userController.login);

User.sync() //{force:true}
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`ERROR : LINE 18 app.js : ERROR SYNC TO DATABASE`);
  });
