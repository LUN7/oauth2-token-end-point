module.exports.delete = [
  passport.authenticate("bearer", {
    session: false,
    failureFlash: true,
  }),
  function (req, res, next) {
    res.send({ data: req.user });
  },
];

module.exports.modify = [
  passport.authenticate("bearer", {
    session: false,
    failureFlash: true,
  }),
  function (req, res, next) {
    res.send({ data: req.user });
  },
];

