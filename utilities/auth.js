const authUser = function (req, res, next) {
  if (req.session.userName) {
    next();
  } else {
    res.status(401);
    res.redirect('/login');
  }
};

module.exports = { authUser };
