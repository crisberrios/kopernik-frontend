/*
 *
 * Created by cristian on 23/02/15.
 * controller for receiving data from Kopernik's chrome extension
 */

module.exports = function(req, res, next) {
  res.json(req.body);
}
