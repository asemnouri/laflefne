//to use process.env for deployment(check .env file!)
const dotenv = require('dotenv')
dotenv.config()
//for mongo db 
const mongoose = require('mongoose');
//(check .env file!)
//const dbURI = 'mongodb://localhost:27017/laflefne'
//test123

//const dbURI = 'mongodb+srv://dima:test123@dimadb.oupob.mongodb.net/laffeh?retryWrites=true&w=majority'
const dbURI = 'mongodb+srv://asemOne:asem1234@cluster0.xqniz.mongodb.net/laffeh?retryWrites=true&w=majority'
//mongoose.connect(process.env.DB_CONNECT, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect( process.env.MONGODB_URI ||dbURI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
var db = mongoose.connection
//to check if there is a connection with db or not 
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('connection to db +sucessful')
})
//Schemas
let tripsSchema = mongoose.Schema({
    // id: { type: Number, unique: true },
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
    chatData: []
})
let userSchema = mongoose.Schema({
    userName: String,
    userMail: String,
    userPass: String,
    userNum: String, 
    trips: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tripsinfo',
    }],
    userimage: String,
    newsLetter: Boolean,
    admin: Boolean,
    master: Boolean,
    invitations: [{
        tripId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tripsinfo',
        },
        senderName: String,
        from_email: String
    }]  
})





let trips = mongoose.model("tripsinfo", tripsSchema);
let users = mongoose.model("userinfo", userSchema);


var Float = require('mongoose-float').loadType(mongoose);
const Schema = mongoose.Schema;
let paymentSchema = new Schema({
    // userid: Number,
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Float,
        required: true
    },
    exp_year: {
        type: Number,
        required: true,
    },
    exp_month: {
        type: String,
        required: true,
    },
    line1: {
        type: String,
    },
    city: String,
    country: String,
    last4: {
        type: String,
        required: true
    }
}, { timestamps: true });
let Payment = mongoose.model('Payment', paymentSchema);
module.exports.Payment = Payment;
module.exports.users = users
//module.exports.payment = payment
module.exports.trips = trips
//module.exports.RoomChat = RoomChat
