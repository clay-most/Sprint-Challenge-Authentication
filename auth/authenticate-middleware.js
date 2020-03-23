const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate() {
  return async (req, res, next) => {
    try {
      console.log(req.cookies);
      const { token } = req.cookies;
      if (!token) {
        return res.status(401).json({message:"You shall not pass!"});
      }

      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({message:"You shall not pass!"});
        }
        req.token = decoded;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = authenticate;
