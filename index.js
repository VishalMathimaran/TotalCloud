const express = require('express');
const app = express();
const mongoose = require('mongoose');
let bodyParser=require('body-parser');
const request=require('request');
const cors = require('cors');
app.options('*', cors());
app.use(cors({
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Create user with book details
app.get('/searching', function(req, res){

 // input value from search
// url used to search yql
var url = "https://totalcloud-static.s3.amazonaws.com/intern.json";
console.log(url);
request(url, function(err, resp, body) {
 body = JSON.parse(body);

 // pass back the results to client side
 res.send(body);
});
// testing the route
// res.send("WHEEE");

});
app.listen(5000,function(){
  console.log("Server is listening at port 5000");
})
