const express = require('express');
const app = express();
const routers = require('./routes');
// const {trips}=require("./DataModel")
var cookieParser = require('cookie-parser')
const auth = require('./auth')
const path = require('path');

const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

//connect frontend with backend
// app.use(express.static(__dirname + '/frontend/build'))

//for deployment
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(__dirname + '/frontend/build'))
// }

console.log("*************111111111*************")
// app.get('/', (req, res) => {
//   console.log('////////////////////////////////////////////////////////')
//   res.send("okkkk")
// })
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/frontend/build'))
}
//  app.post("/data",async (req,res)=>{
//    let result=req.body.data
//    console.log( result.length)
//    for(let i=0; i<result.length;i++){
//     // res.send(result[i])
//      let trip =new trips(result[i])
//      await trip.save()
//      .then(data=>console.log(data))
//      .catch(err=>console.log(err))
//    }

//  }) 
app.get('/', (req, res) => {
  res.json({ mess: "welcome welcome" })
})
app.use('/', routers)
module.exports = app;

