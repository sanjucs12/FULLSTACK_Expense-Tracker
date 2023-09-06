const User = require("../database/user");

exports.signUp = async (req, res, next) => {
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
    res
      .status(409)
      .send({ message: `EMAIL ALREADY EXISTS...!! PLEASE SIGN-IN` });
    console.log(`ERROR IN LINE 25 : controllers/user-controller.js : ${err}`);
  }
};

exports.login = async (req, res, next) => {
  try {
    // console.log(req.body);

    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .send({ message: "PLEASE ENTER THE LOGIN ID AND PASSWORD...!!!" });
    }
    //CHECK IF EMAIL EXISTS IN DATABASE
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    // console.log(emailExists);

    if (!emailExists) {
      return res.status(404).send({ message: `EMAIL ID DOESN'T EXIST` });
    } else {
      const checkPassword = emailExists.dataValues.password;
      if (checkPassword === req.body.password) {
        res.status(200).send({ message: "LOGGED IN SUCCESSFULLY" });
      } else {
        res.status(401).send({ message: "INCORRECT PASSWORD" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: "SOMETHING WENT WRONG" });
    console.log(`ERROR IN LINE 53 : controllers/user-controller.js : ${err}`);
  }
};
