//to use process.env for deployment(check .env file!)
const dotenv = require('dotenv')
dotenv.config()
//for mongo db 
const mongoose = require('mongoose');
//(check .env file!)
const dbURI = 'mongodb+srv://ameed:test1234@green-feild.xwxax.mongodb.net/laflefne?retryWrites=true&w=majority'
//mongoose.connect(process.env.DB_CONNECT, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
mongoose.connect(dbURI, { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
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
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomChat',
        required: true
    }
})
let userSchema = mongoose.Schema({
    // id: { type: Number, unique: true, sparse: true },
    userName: String,
    userMail: String,
    userPass: String,
    userNum: String,
    trips: [String],
    userimage: String,
    newsLetter: Boolean,
    admin: Boolean
})

let paymentSchema = mongoose.Schema({
    // id: { type: Number, unique: true },
    creditCard: Number,
    cvv: Number,
    exDate: Date
})

let roomChatSchema = mongoose.Schema({
    // tripId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'trips',
    //     required: true
    // },                
    msgsBody: [{ //can have an id represented by the obj index in the array, so no need 
        body: String,
        username: String
    }],
})
let RoomChat = mongoose.model("RoomChat", roomChatSchema);
let trips = mongoose.model("tripsinfo", tripsSchema);
let users = mongoose.model("userinfo", userSchema);
let payment = mongoose.model("paymentinfo", paymentSchema);

// var test = new RoomChat({
//     tripId: 1,
//     msgsBody: [{
//         body: 'okkk saved msg1',
//         username: 'Dima'
//     }]
// })
// test.save().then(() => {
//     console.log('SAVED')
// }).catch('NOT SAVED')


// let tripTest = new trips({
//     "explore": "Explore Wadi Al-Qilt",
//     "image": [
//         [
//             "https://alqudsnewspaperblog.files.wordpress.com/2016/04/13054570_255284498154121_1083704375_o.jpg",
//             "https://www.emaratalyoum.com/polopoly_fs/1.961263.1484330235!/image/image.jpg",
//             "https://www.emaratalyoum.com/polopoly_fs/1.961260.1484330231!/image/image.jpg"
//         ]
//     ],
//     "tripType": "One Day Trip",
//     "name": "Wadi Al-Qilt Trip",
//     "price": "150 NIS",
//     "date": "2020-11-18T00:00:00.000+00:00",
//     "deadLine": "2020-11-17T00:00:00.000+00:00",
//     "tripGuide": "Guide 1",
//     "maximumNumPerTrip": 40,
//     "idOfTourist": [],
//     "discription": {
//         "1": "The trail starts from the outskirts of Jerusalem to Jericho and the Jordan Valley.It is an amazing experience for climbers and nature lovers. In addition to climbing and walking being a beautiful and exciting sport, you can also visit the Monastery of Saint George in Cosiba.The path is considered one of the most beautiful paths in Palestine and is full of natural and geological landscapes, so that the walker is dazzled by a painting of the mesmerizing rock formations and the curves of caves where the rocky pile lives, and green trees extend on both sides of the canal to form an oasis in the wadi desert."
//     },
//     roomId: "5fbae8ba7fe72f5c9cb288be"
// })

// tripTest.save().then((data) => console.log(data)).catch((err) => console.log(err))
module.exports.users = users
module.exports.payment = payment
module.exports.trips = trips
module.exports.RoomChat = RoomChat