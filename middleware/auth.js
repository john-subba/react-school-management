const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header('x-auth-token');

  // check if there is token or not
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'TOKEN not found, User is not authorized' });
  }

  // validate token
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: 'TOKEN is not valid' });
  }
};
