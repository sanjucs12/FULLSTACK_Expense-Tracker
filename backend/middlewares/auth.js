const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = async (req, res, next) => {
  try {
    // console.log(req.header("Authorization"));
    const token = req.header("Authorization"); //THE TOKEN WHICH WE PASSED IN HEADERS FROM FRONTEND
    const user = jwt.verify(token, "secretkey"); //DECRYPTING THE TOKEN TO KNOW THE CURRENT LOGGED IN USER
    // console.log(user);
    const currentLoggedInUser = await User.findByPk(user.userId);
    console.log(currentLoggedInUser.id);
    req.user = currentLoggedInUser; //REQ IS THE COMMON OBJECT WHICH WE HAVE. HERE WE ARE MAKING currentLoggedInUser to flow to the next() function through req object
    next();
  } catch (err) {
    console.log(`ERROR IN LINE 15 : MIDDLEWARES/AUTH.JS : ${err}`);
    return res.status(401).json({ success: false });
  }
};
