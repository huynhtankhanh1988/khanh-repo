
/*
 * GET home page.
 */
var pollController = require("../controller/poll")
exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
 * Get a poll
 */
exports.get_poll = function(req, res, next){
  pollController.getPoll(req, res);
};

/*
 * Search polls
 */
exports.search_polls = function(req, res, next){
  pollController.searchPolls(req, res);
};

/*
 * create a poll
 */
exports.create_poll = function(req, res, next){
  pollController.createPoll(req, res);
};

/*
 * update a poll
 */
exports.update_poll = function(req, res, next){
  pollController.updatePoll(req, res);
};
