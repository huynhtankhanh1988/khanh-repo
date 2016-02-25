exports.updateLink = function(req, res){
  console.log("param~ " + req.params.id);
  var end_point = "/v1.0/links/" +  req.params.id;
  var client = new Client();
  // prepare body
  var body = '<link xmlns="http://api.worldnow.com/cms" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">'
  +'<id>431734</id>'
  +'<headline>Test new link to third party update</headline>'
  +'</link>';

  var args = {
  		headers: {'Authorization': 'struong~worldnow113~6',
                'Content-Type': 'application/xml'
              },
  		data: body
  	  };
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
      client.put("https://cms.ddev1.worldnow.com" + end_point, args, function(data, response){
      			console.log(data);
            res.render('link', { title:  data})
      			console.log(response);
      });
  console.log("End update a link");
};
