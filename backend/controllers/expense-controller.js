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
    const newExpense = await Expense.create({
      amount: amount,
      description: description,
      category: category,
    });
    res.status(201).json(newExpense);
    console.log(`NEW EXPENSE ADDED : ${newExpense}`);
  } catch (err) {
    res.status(500).json({ message: `SOMETHING WENT WRONG : ${err}` });
    console.log(
      `ERROR IN LINE 16 : CONTROLLERS/EXPENSE-CONTROLLER.JS : ${err}`
    );
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
    console.log(`EXPENSES RETREIVED FROM DATABASE : ${expenses}`);
  } catch (err) {
    console.log(`ERROR IN LINE 33 : CONTROLLERS/EXPENSE-CONTROLLER : ${err}`);
    res.status(500).json(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    // console.log(expenseId);
    await Expense.destroy({ where: { id: expenseId } });
    res.status(200).json({ message: `ITEM REMOVED` });
  } catch (err) {
    console.log(
      `ERROR IN LINE 45 : CONTROLLERS/EXPENSE-CONTROLLER.JS : ${err}`
    );
    res.status(500).json(err);
  }
};
