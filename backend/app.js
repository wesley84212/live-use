var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var kWhRouter = require('./routers/kWh');
var app = express();
var cors = require('cors');
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.1.112:3000']
const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'http://localhost:8080',
    'http://172.20.10.8:3000',
    'http://192.168.1.112:3000',
    'http://192.168.1.106:3000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/kHw', kWhRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
let errorCode = {
  404: { url: 404, content: "找不到頁面" }
};

app.use(function (err, req, res, next) {

  res.render('notFound', errorCode[err.status])

});

app.get('*', function (err, req, res) {
  res.render('notFound', errorCode[err.status])
})

module.exports = app;
