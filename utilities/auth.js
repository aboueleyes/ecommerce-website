const { StatusCodes } = require('http-status-codes');

const authUser = function (req, res, next) {
  if (req.session.userName) {
    next();
  } else {
    res.status(StatusCodes.UNAUTHORIZED);
    res.redirect('/login');
  }
};

module.exports = { authUser };
