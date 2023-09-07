const User = require("../utils/user");
const bcrypt = require("bcrypt"); //USED FOR PASSWORD ENCRYPTION : USES BLOW FISH ALGORITHM

exports.signUp = async (req, res, next) => {
  //   console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const isValidString = (string) => {
    const removeSpaces = string.trim();
    return removeSpaces.length > 0;
  };

  try {
    if (
      !isValidString(name) ||
      !isValidString(email) ||
      !isValidString(password)
    ) {
      console.log(`ERROR IN LINE 11 : controllers/user-controller.js`);
      return res
        .status(400)
        .json({ message: "PLEASE ENTER VALID DETAILS...!!!" });
    }
    const hash = await bcrypt.hash(password, 10); //10 REFERS TO SALT ROUNDS
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
    });
    res.status(201).json({ message: `new user added : ${newUser.name}` });
    // console.log(newUser);
  } catch (err) {
    res
      .status(409)
      .json({ message: `EMAIL ALREADY EXISTS...!! PLEASE SIGN-IN` });
    console.log(`ERROR IN LINE 25 : controllers/user-controller.js : ${err}`);
  }
};

exports.login = async (req, res, next) => {
  try {
    // console.log(req.body);

    if (!req.body.email || !req.body.password) {
      return res
        .status(404)
        .json({ message: "PLEASE ENTER THE LOGIN ID AND PASSWORD...!!!" });
    }
    //CHECK IF EMAIL EXISTS IN DATABASE
    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });
    // console.log(emailExists);

    if (!emailExists) {
      return res.status(404).json({ message: `EMAIL ID DOESN'T EXIST` });
    } else {
      //IF EMAIL EXISTS : COMPARE THE PASSWORDS THAT IS STORED AS HASH
      const hashPassword = emailExists.dataValues.password;

      const checkPassword = await bcrypt.compare(
        req.body.password,
        hashPassword
      );
      // console.log(checkPassword);
      if (checkPassword) {
        res.status(200).json({ message: "LOGGED IN SUCCESSFULLY" });
      } else {
        res.status(401).json({ message: "INCORRECT PASSWORD" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: "SOMETHING WENT WRONG" });
    console.log(`ERROR IN LINE 53 : controllers/user-controller.js : ${err}`);
  }
};
