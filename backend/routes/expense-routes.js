const express = require("express");
const expenseController = require("../controllers/expense-controller");
const userAuthentication = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/add-expense",
  userAuthentication.authenticate,
  expenseController.addExpense
);
router.delete(
  "/remove-expense/:id",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);
router.get(
  "/get-expenses",
  userAuthentication.authenticate,
  expenseController.getExpenses
);

module.exports = router;
