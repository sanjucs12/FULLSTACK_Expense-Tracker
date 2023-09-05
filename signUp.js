async function signUpHandler(e) {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  if (!name || !email || !password) {
    alert("PLEASE ENTER DETAILS");
  } else {
    try {
      const signUpDetails = {
        name: name,
        email: email,
        password: password,
      };
      console.log(signUpDetails);

      const response = await axios.post(
        "http://localhost:3000/user/sign-up",
        signUpDetails
      );
      if (response.status === 201) {
        window.location.href = "../login/login.html";
      } else {
        throw new Error("failed to login");
      }
    } catch (err) {
      document.body.innerHTML = `<div style="color:red">${err}</div>`;
    }
  }
}
