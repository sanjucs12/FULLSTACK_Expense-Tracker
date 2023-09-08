const errorContainer = document.querySelector(".error-container");

const loginHandler = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  if (!email || !password) {
    errorContainer.innerHTML = `<span style="color:red">PLEASE ENTER DETAILS..!!!</span>`;
  } else {
    try {
      const loginDetails = {
        email: email,
        password: password,
      };
      //   console.log(loginDetails);
      const response = await axios.post(
        `http://localhost:3000/user/login`,
        loginDetails
      );
      // console.log(response);
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      window.location.href = "../expense/expense.html";
    } catch (err) {
      //   console.log(err);
      errorContainer.innerHTML = `<span style="color:red">${err.response.data.message}</span>`;
    }
  }
};
