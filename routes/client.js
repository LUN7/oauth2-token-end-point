const { clients } = require("../db");

/**
 * @apiDefine lun the owner of the project
 */

/**
 * @api {post} /auth/client/:clientId delete client in auth db
 * @apiName oauthClientDelete
 * @apiGroup Client
 * @apiPermission lun
 * 
 * @apiParam {String} clientId client unique id
 * 
 * @apiSuccess {Client} data Client Object 
 * 
 */
module.exports.delete = function (req, res, next) {
  const { clientId } = req.params;

  try{
    if (!clientId) return next(new Error("client id not found"));
    clients.delete(data, (err, client) => {
      if (err) return next(new Error(err));
      if (!client) return next(new Error("client not found"));
      return res.send({ data: client });
    });
  } catch (err) {
    next(err)
  }
};

/**
 * @api {post} /auth/client/:clientId edit or create client in auth db
 * @apiName oauthClientEdit
 * @apiGroup Client
 * @apiPermission lun
 * 
 * @apiParam {String} clientId client unique id
 * @apiParam {Client} data client object
 * 
 * @apiSuccess {Client} data Client Object 
 * 
 */
module.exports.post = function (req, res, next) {
  const { clientId } = req.params;
  const { data } = req.body;

  try{
    if (!clientId) return next(new Error("client id not found"));
    if (!data) return new Error("client body not found");
    clients.create(data, (err, client) => {
      if (err) return next(new Error(err));
      if (!client) return next(new Error("client not found"));
      return res.send({ data: client });
    });
  } catch (err) {
    next(err)
  }
};
