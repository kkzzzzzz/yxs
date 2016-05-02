var express = require('express');
var app = express();
app.use('/static', express.static('public'));



app.get('/', function (req, res) {

    res.send(
        "<script src=\"//cdn.bootcss.com/jquery/2.2.1/jquery.js\"></script>"+
        "<script src=\"//cdn.bootcss.com/camanjs/4.1.2/caman.full.min.js\"></script>"+
        "<canvas id=\"canvas\" width=\"638\" height=\"641\"></canvas>"+
        "<canvas style=\"display: none\" id=\"hidetext\" width=\"638\" height=\"641\"></canvas>"+
        "<input type='text' id='text' value=''></input>"+
        "<input type='button' id='encode' value='encode'></input>"+
        "<input type='button' id='decode' value='decode'></input>"+
        "<script type=\"text/javascript\" src=\"/static/javascript/yxs.js\"></script>"
    )
    ;
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
