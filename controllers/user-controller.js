const User = require("../database/user");

exports.addUser = async (req, res, next) => {
  //   console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!name || !email || !password) {
      console.log(`ERROR IN LINE 11 : controllers/user-controller.js`);
      return res
        .status(400)
        .send({ message: "PLEASE ENTER THE DETAILS...!!!" });
    }

    const userDetails = {
      name: name,
      email: email,
      password: password,
    };
    const newUser = await User.create(userDetails);
    res.status(201).send({ message: `new user added : ${newUser.name}` });
    // console.log(newUser);
  } catch (err) {
    res.status(409).send({ message: `EMAIL ALREADY EXISTS...!! PLEASE SIGN-IN` });
    console.log(`ERROR IN LINE 25 : controllers/user-controller.js : ${err}`);
  }
};
