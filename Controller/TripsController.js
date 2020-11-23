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
    console.log('Here creating trip******************************************************')
    //must create chat room for the trip before saving to db
    var trip;
    var chatR = new chatRoom({
        msgsBody: [{}],
    })
    chatR.save()
        .then((room) => {
            console.log('RoomChat created')
            trip = new trips({
                image: req.body.data.image, //array
                tripType: req.body.data.tripType,
                name: req.body.data.name,
                explore: req.body.data.explore,
                price: req.body.data.price,
                date: req.body.data.date,
                deadLine: req.body.data.deadLine,
                tripGuide: req.body.data.tripGuide,
                maximumNumPerTrip: req.body.data.maximumNumPerTrip,
                idOfTourist: req.body.data.idOfTourist, //array
                discription: req.body.data.discription,
                roomId: room._id
            })
            trip.save().then((trip) => {
                console.log("trip saved")
                res.status(200).json(trip)
            })
                .catch((err) => {
                    console.log(err)
                    console.log('Trip not saved')
                    res.status(404).send("Trip not saved")
                })

        })
        .catch((err) => {
            console.log(err)
            console.log('room not saved')
            res.status(404).send('No room created- no trip saved')
        })

}