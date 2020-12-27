const passport = require("passport");

module.exports.me = [
    passport.authenticate("bearer", {
      session: false,
      failureFlash: true
    }),
    function(req, res, next){
        res.send({data: req.user})
    }
  ];
  