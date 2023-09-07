async function expenseFormSubmitHandler(e) {
  e.preventDefault();
  const amount = e.target.amount.value;
  const description = e.target.description.value;
  const category = e.target.category.value;
  const isValidAmount = (string) => {
    return /^[0-9]+$/.test(string); //REGULAR EXPRESSION TO CHECK WEATHER THE STRING CONSISTS OF ONLY DIGITS FROM (0-9)
  };

  if (!isValidAmount(amount) || !category) {
    alert("ENTER VALID DETAILS");
  } else {
    try {
      const expenseDetails = {
        amount: amount,
        description: description,
        category: category,
      };

      const response = await axios.post(
        "http://localhost:3000/expense/add-expense",
        expenseDetails
      );
      // console.log(response);
      displayExpense(response.data);
    } catch (err) {
      console.log(err);
      alert("SOMETHING WENT WRONG");
    }
  }
}

function displayExpense(obj) {
  const expenseTable = document.querySelector(".expense-table");
  const expenseRow = document.createElement("tr");
  expenseRow.classList.add("table-row");
  expenseRow.innerHTML = `
          <td>${obj.amount}</td>
          <td>${obj.description}</td>
          <td>${obj.category}</td>
          <td><button id="delete-expense-btn">Delete Expense</button></td>
          `;
  expenseTable.appendChild(expenseRow);
  const deleteExpenseBtn = expenseRow.querySelector("#delete-expense-btn");
  deleteExpenseBtn.addEventListener("click", (event) => {
    deleteExpenseHandler(event, obj);
  });
}

async function deleteExpenseHandler(e, obj) {
  e.preventDefault();
  const expenseRow = e.target.closest(".table-row");
  // console.log(expenseRow);
  try {
    const response = await axios.delete(
      `http://localhost:3000/expense/remove-expense/${obj.id}`
    );
    // console.log(response);
    await expenseRow.remove();
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("DOMContentLoaded", getExpenseDataHandler);
async function getExpenseDataHandler() {
  try {
    const response = await axios.get(
      "http://localhost:3000/expense/get-expenses"
    );
    // console.log(response.data);
    response.data.map((expense) => {
      displayExpense(expense);
    });
  } catch (err) {
    console.log(err);
    alert("PLEASE TRY AGAIN");
  }
}
