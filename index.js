//connecting to the local bakend server
var app = require('./server')
var port = process.env.PORT || 4000; //process.env.PORT ||

app.listen(port, () => {
  console.log(`listening to ${port}`)
})