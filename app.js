var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//database connection string
mongoose.connect('mongodb://miracle:miracle123@ds115569.mlab.com:15569/msoft',{useNewUrlParser: true },function(){
    console.log('connected to mongoose');
});

//defining routes
var userRoute =require('./routes/user.route');
var bookRoute =require('./routes/books.route');

var app = express();
var port = 3000;

//enable cors
app.use(cors());

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', userRoute);
app.use('/book', bookRoute);

app.listen(port,function(){
    console.log('Listenting to port 3000');
})