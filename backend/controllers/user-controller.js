const User = require("../models/user");
const bcrypt = require("bcrypt"); //USED FOR PASSWORD ENCRYPTION : USES BLOW FISH ALGORITHM : ITS ONE WAY ENCRYPTION
const jwt = require("jsonwebtoken"); //USED TO ENCRYPT USERID : CAN BE DECRYPTED TOO

const signUp = async (req, res, next) => {
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
      console.log(`ERROR IN LINE 22 : controllers/user-controller.js`);
      return res
        .status(400)
        .json({ success: false, message: "PLEASE ENTER VALID DETAILS...!!!" });
    }
    const hash = await bcrypt.hash(password, 10); //10 REFERS TO SALT ROUNDS
    const newUser = await User.create({
      name: name,
      email: email,
      password: hash,
    });
    res
      .status(201)
      .json({ success: true, message: `new user added : ${newUser.name}` });
    // console.log(newUser);
  } catch (err) {
    res.status(409).json({
      success: false,
      message: `EMAIL ALREADY EXISTS...!! PLEASE SIGN-IN`,
    });
    console.log(`ERROR IN LINE 25 : controllers/user-controller.js : ${err}`);
  }
};

const generateAccessToken = (id, name, email) => {
  return jwt.sign({ userId: id, name: name, email: email }, "secretkey");
};

const login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "PLEASE ENTER THE LOGIN ID AND PASSWORD...!!!",
      });
    }
    //CHECK IF EMAIL EXISTS IN DATABASE
    const userExists = await User.findOne({
      where: { email: email },
    });

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: `EMAIL ID DOESN'T EXIST` });
    } else {
      // console.log(`print : ${userExists}`);
      //IF EMAIL EXISTS : COMPARE THE PASSWORDS THAT IS STORED AS HASH
      const hashPassword = userExists.password;
      const checkPassword = await bcrypt.compare(password, hashPassword);
      // console.log(checkPassword);

      //IF PASSWORD MATCH IS TRUE : SEND SUCCESS RESPONSE
      if (checkPassword) {
        const { id, email, name } = userExists;
        //ENCRYPT THE ID,NAME AND EMAIL TO SEND TO THE FRONT END AS RESPONSE DATA
        res.status(200).json({
          success: true,
          message: "LOGGED IN SUCCESSFULLY",
          token: generateAccessToken(id, email, name),
        });
      } else {
        res.status(401).json({ success: false, message: "INCORRECT PASSWORD" });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "SOMETHING WENT WRONG" });
    console.log(`ERROR IN LINE 53 : controllers/user-controller.js : ${err}`);
  }
};

module.exports = {
  signUp,
  login,
  generateAccessToken,
};
