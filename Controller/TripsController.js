//requiring the trips schema
const trips = require("../DataModel").trips
//requiring the users schema
const UserModel = require('../DataModel').users
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
    trips.findOne({ _id: req.body.id }, (err, trip) => {
        if (err)
            return res.status(400).send(err);
        if (trip) {
            trip.idOfTourist.push(req.body.idOfTourist);
            trips.updateOne({ _id: trip._id }, { idOfTourist: trip.idOfTourist }, (err, data) => {
                if (err)
                    return res.status(400).send(err);
                if (data) {
                    //to add trip id to trips array in user collection.  
                    UserModel.findOne({ _id: req.body.idOfTourist }, (err, user) => {
                        if (err)
                            return res.status(400).send(err);
                        if (user) {
                            user.trips.push(req.body.id)
                            UserModel.updateOne({ _id: user._id }, { trips: user.trips }, (err, data) => {
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