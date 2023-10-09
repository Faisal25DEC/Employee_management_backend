const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.substring(7);
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      res.send({ loggedIn: false });
    } else {
      req.userId = decoded.userId;

      next();
    }
  });
};

module.exports = { authenticate };
