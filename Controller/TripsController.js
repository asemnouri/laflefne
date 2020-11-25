//requiring the trips schema
const trips = require("../DataModel").trips
//requiring the users schema
const UserModel = require('../DataModel').users
//requiring the chatRoom schema
const chatRoom = require('../DataModel').RoomChat
//require the data fron the json data file
const tripsData = require('../Data/trips.json')

//to get all trip information from data base
exports.tripsList = (req, res) => {

    trips.find({}, (err, trips) => {
        if (err)
            res.send(err);
        res.json(trips);
    });
}


//to add tourist(user) id to idOfTourist array in trips collection.
exports.updateTrip = (req, res) => {
    trips.findOne({ _id: req.body.id }, (err, trip) => {   //1 SO here get the trip
        if (err)
            return res.status(400).send(err);
        if (trip) {
            trip.idOfTourist.push(req.body.idOfTourist);   //2 Push the userid to the touristsId array of this trip
            trips.updateOne({ _id: trip._id }, { idOfTourist: trip.idOfTourist }, (err, data) => {  //3  
                if (err)
                    return res.status(400).send(err);
                if (data) {
                    //to add trip id to trips array in user collection.  
                    UserModel.findOne({ _id: req.body.idOfTourist }, (err, user) => {   // 3 return the user of this touristId
                        if (err)
                            return res.status(400).send(err);
                        if (user) {
                            user.trips.push(req.body.id)
                            UserModel.updateOne({ _id: user._id }, { trips: user.trips }, (err, data) => {   // 4 add the trip to his trpis arr
                                if (err)
                                    return res.status(400).send(err);
                                if (data) {
                                    return res.status(200).send('all update')
                                }
                            })
                        }
                    })
                }
            }
            )
        }
    })
}

//to fill trips db from json file (request recived from postman)
exports.fillTrips = (req, res) => {
    for (let index = 0; index < tripsData.length; index++) {
        var trip = new trips(tripsData[index])
        trip.save((err, trip1) => {
            if (err)
                console.log(err)
            console.log(trip1)
        })
    }
    res.send(tripsData)
}

//get trip by it's id
exports.getmytrips = (req, res) => {
    console.log(req.body)
    trips.findOne({ _id: req.body.id }, (err, data) => {
        if (data) {
            res.send(data)
        }
    })
}

//create trip
exports.addTrip = (req, res) => {
    console.log('Here creating trip**************************//////////////////****************************')
    //must create chat room for the trip before saving to db
    var trip;
    var image_ = req.body.data.image[0].split('||')
    let innerArray = []
    image_.forEach(img => innerArray.push(img.split("--")))

    var disc = req.body.data.discription[0].split('-');


    var disc = req.body.data.discription[0].split('-');
    var disc_obj = {}
    for (var i = 0; i < disc.length; i++) {
        disc_obj[i] = disc[i]
    }
    let result=[]
    result.push(image_)
    trip = new trips({
        image: innerArray, //array
        tripType: req.body.data.tripType[0],
        name: req.body.data.name[0],
        price: req.body.data.price[0],
        date: req.body.data.date[0],
        deadLine: req.body.data.deadLine[0],
        tripGuide: req.body.data.tripGuide[0],
        maximumNumPerTrip: req.body.data.maximumNumPerTrip[0],
        idOfTourist: [], //array
        discription: disc_obj,
        chatData: [],
        explore:"Explore Palestine"
    })
    trip.save().then((trip) => {
        console.log("trip saved")
        res.status(200).json(trip)
    })

        .catch((err) => {
            console.log(err.message)
            console.log('Trip not saved')
            res.status(404).send("Trip not saved")
        })
}

exports.getusertrips = (req, res) => {
    let userid = req.body.userid
     UserModel.findOne({ _id: userid }).populate("trips")
    .then(data=>res.send(data))
}
   