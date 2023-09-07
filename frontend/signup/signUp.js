const errorContainer = document.querySelector(".error-container");

async function signUpHandler(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;

  const isValidString = (string) => {
    const removeSpaces = string.trim();
    return removeSpaces.length > 0;
  };

  if (
    !isValidString(name) ||
    !isValidString(email) ||
    !isValidString(password)
  ) {
    // alert("PLEASE ENTER DETAILS");
    errorContainer.innerHTML = `<span style="color:red">PLEASE ENTER VALID DETAILS...!!!</span>`;
  } else {
    try {
      const signUpDetails = {
        name: name,
        email: email,
        password: password,
      };
      //   console.log(signUpDetails);

      const response = await axios.post(
        "http://localhost:3000/user/sign-up",
        signUpDetails
      );
      console.log(response.data.message);
      // window.location.href = "../login/login.html";
    } catch (err) {
      //   console.log(err);
      errorContainer.innerHTML = `<span style="color:red">${err.response.data.message}</span>`;
    }
  }
}
