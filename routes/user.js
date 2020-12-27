const passport = require("passport");

const sendUser = () => (req, res, next) => {
  res.send({ data: req.user });
};

/**
 * @api {post} /auth/me get me info with access token
 * @apiName oauthGetMe
 * @apiGroup Me
 * @apiPermission lun
 * 
 * @apiParam {String} access_token access token
 * 
 * @apiSuccess {User} data User Object 
 * 
 */
module.exports.me = [
  passport.authenticate("bearer", {
    session: false,
    failureFlash: true,
  }),
  sendUser(),
];
