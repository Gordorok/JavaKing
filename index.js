const express = require('express'),
app = express();
const https = require('https');

app.route('/')
.get(function(req,res){
	https.get('https://fr.wikipedia.org/wiki/Louis_XIV', (resp) => {
		let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
  	data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
  	console.log(data);
  	res.send(data);
  });

}).on("error", (err) => {
	console.log("Error: " + err.message);
});

});
app.listen(3500);