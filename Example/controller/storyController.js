var http = require('http');

exports.searchStories = function(request, response){
    var url = "/stories/search";
    var body = JSON.stringify(request.body);
    var header = {
        'Content-Type':'application/json',
        'Authorization':'struong~worldnow113~6',
        'Content-Length': Buffer.byteLength(body)
    };
    var options = {
        host: '52.26.36.231',
        port: '9000',
        path: url,
        method: 'POST',
        headers: header
    }
    var responseString = "";
    var req = http.request(options, function(res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    responseString+=chunk;
                });

                res.on('end',function(){
                    response.json(responseString);
                });
            });

    // post the body     data
    req.write(body);
    req.on('error', function(e) {
          console.error(e);
    });
    req.end();
}