var koa = require('koa');
var app = koa();

var faker = require('faker');

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  var TotalRecords = 1000;
  var i = 0;
  var bodyString = "";
  while(i < TotalRecords){
    bodyString += faker.name.findName() + " email: " + faker.internet.email() + "\n";
    i++;
  }
  this.body = bodyString;
});

app.listen(3000);
