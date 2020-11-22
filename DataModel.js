//to use process.env for deployment(check .env file!)
const dotenv = require('dotenv')
dotenv.config()
//for mongo db 
const mongoose = require('mongoose');
//(check .env file!)
const dbURI = 'mongodb+srv://asemOne:asem1234@cluster0.xqniz.mongodb.net/laffeh?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
var db = mongoose.connection
//to check if there is a connection with db or not 
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('connection to db sucessful')
})
//Schemas
let tripsSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    image: [[String]],
    tripType: String,
    name: String,
    explore: String,
    price: String,
    date: Date,
    deadLine: Date,
    tripGuide: String,
    maximumNumPerTrip: Number,
    idOfTourist: [String],
    discription: {
        type: Object
    },
})
let userSchema = mongoose.Schema({
    id: { type: Number, unique: true, sparse: true },
    userName: String,
    userMail: String,
    userPass: String,
    userNum: String,
    trips: [String],
    userimage: String,
    newsLetter: Boolean
})

let paymentSchema = mongoose.Schema({
    id: { type: Number, unique: true },
    creditCard: Number,
    cvv: Number,
    exDate: Date
})

let trips = mongoose.model("tripsinfo", tripsSchema);
let users = mongoose.model("userinfo", userSchema);
let payment = mongoose.model("paymentinfo", paymentSchema);

module.exports.users = users
module.exports.payment = payment
module.exports.trips = trips