const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./backend/utils/database");
const userRoutes = require("./backend/routes/user-routes");
const expenseRoutes = require("./backend/routes/expense-routes");

const User = require("./backend/models/user");
const Expense = require("./backend/models/expense");

const app = express();
app.use(cors()); //ALLOW REQUESTS FROM ALL ORIGINS
app.use(bodyParser.json()); //PARSES THE INCOMMING REQUESTS AND STORES IT INSIDE THE BODY OBJECT

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);

User.hasMany(Expense);  //ONE TO MANY RELATION : BETWEEN USER AND EXPENSE
Expense.belongsTo(User);

sequelize
  .sync() //{force:true}
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(`ERROR : LINE 18 app.js : ERROR SYNC TO DATABASE`);
  });
