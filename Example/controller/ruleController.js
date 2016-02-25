var RuleApi = require('../api/ruleAPI').RuleApi;
exports.getRule = function(request, response){
  var ruleApi = new RuleApi();
  var id = request.params.ruleId;
  console.log("Controller - Rule ID : " + id);
  ruleApi.getRuleById(id, function (res){
    console.log(res);
    response.json(res);
  });
}

exports.createRule = function(request, response){
    var body = JSON.stringify(request.body);
    var url = '/rules/create';
    var options = {
        host: '52.26.36.231',
        port: '9000',
        path: url,
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'struong~worldnow113~6',
          'Content-Length': Buffer.byteLength(body)
        }
    };
    var responseString = '';
    var req = http.request(options, function(res) {
    			res.setEncoding('utf8');
    			res.on('data', function (chunk) {
    			    responseString+=chunk;
    			});

    			res.on('end',function(){
    				response.json(responseString);
    			})
    		});

    // post the body     data
    req.write(body);
    req.end();
}


exports.updateRule = function(request, response){
    var body = JSON.stringify(request.body);
    var url = '/rules/update/'+ request.params.ruleId;
    var options = {
        host: '52.26.36.231',
        port: '9000',
        path: url,
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'struong~worldnow113~6',
          'Content-Length': Buffer.byteLength(body)
        }
    };
    var responseString = '';
    var req = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    responseString+=chunk;
                    console.log(responseString);
                });

                res.on('end',function(){
                    response.json(responseString);
                })
            });

    // post the body     data
    req.write(body);
    req.end();
}

exports.deleteRule = function(request, response){
     var url = '/rules/' + request.params.ruleId;
     var options = {
         host: '52.26.36.231',
         port: '9000',
         path: url,
         method: 'DELETE',
         headers: {
           'Content-Type':'application/json',
           'Authorization':'struong~worldnow113~6'
         }
     };
     var responseString = '';
     var req = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                responseString+=chunk;
                });
                res.on('end',function(){
                    response.json(responseString);
                })
            });
     req.end();
 }
