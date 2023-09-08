const Expense = require("../models/expense");

exports.addExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  const isValidAmount = (string) => {
    return /^[0-9]+$/.test(string); //REGULAR EXPRESSION TO CHECK WEATHER THE STRING CONSISTS OF ONLY DIGITS FROM (0-9)
  };
  try {
    if (!isValidAmount(amount) || !category) {
      return res.status(400).json({ message: `PLEASE ENTER VALID DETAILS` });
    }
    // console.log(req.user.id);
    const userId = req.user.id; //CURRENT LOGGED IN USERID : (PASSED THROUGS HEADERS AS AUTHORIZATION i.e., TOKEN)
    const newExpense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
      userId: userId,
    });
    res.status(201).json({ success: true, expense: newExpense });
    console.log(`NEW EXPENSE ADDED : ${newExpense}`);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `SOMETHING WENT WRONG`, error: err });
    console.log(
      `ERROR IN LINE 25 : CONTROLLERS/EXPENSE-CONTROLLER.JS : ${err}`
    );
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.id; //CURRENT LOGGED IN USERID : (PASSED THROUGS HEADERS AS AUTHORIZATION i.e., TOKEN)
    const expenses = await Expense.findAll({ where: { userId: userId } });
    res.status(200).json(expenses);
    console.log(`EXPENSES RETREIVED FROM DATABASE : ${expenses}`);
  } catch (err) {
    console.log(`ERROR IN LINE 37 : CONTROLLERS/EXPENSE-CONTROLLER : ${err}`);
    res
      .status(500)
      .json({ success: false, error: err, message: "SOMETHING WENT WRONG" });
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const userId = req.user.id; //CURRENT LOGGED IN USERID : (PASSED THROUGS HEADERS AS AUTHORIZATION i.e., TOKEN)
    const expenseId = req.params.id; //PARAMS GIVES THE DATA THAT WE PASS AS DYNAMIC ROUTE
    // console.log(expenseId);
    await Expense.destroy({ where: { id: expenseId, userId: userId } });
    res.status(200).json({ success: true, message: `ITEM REMOVED` });
  } catch (err) {
    console.log(
      `ERROR IN LINE 45 : CONTROLLERS/EXPENSE-CONTROLLER.JS : ${err}`
    );
    res
      .status(500)
      .json({ success: false, error: err, message: "SOMETHING WENT WRONG" });
  }
};
