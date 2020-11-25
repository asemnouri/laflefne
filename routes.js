const express = require('express');
const routers = express.Router();
const auth = require('./auth')

//User Controller 
const userController = require('./Controller/UserController')
routers.post('/signup', userController.signUpUser);
routers.post('/login', userController.loginUser);
routers.post('/logout', userController.userlogout)
routers.get('/checkuser', auth, (req, res) => {
    res.send(userController.checkuser(req, res))
})
routers.post('/getuserinfo', userController.getuserinfo)
routers.post('/removeuser', userController.removeUser)
routers.get('/alldata', userController.alldata)
routers.get('/makeadmin', userController.makeadmin)
routers.post('/invite-req', userController.setInvitaion)

//Payment Controller 
const paymentController = require('./Controller/PaymentController')
routers.post('/payment', paymentController.payment)
routers.get('/check', auth, (req, res) => {
    res.send(paymentController.check(req, res))
})

//Trips Controller 
const tripController = require('./Controller/TripsController')
routers.get('/gettrips', tripController.tripsList)
//routers.post('/addtrip', tripController.updateTrip)
routers.get('/filldata', tripController.fillTrips)
routers.post('/getmytrips', tripController.getmytrips)
routers.post('/addTrip', tripController.addTrip)
routers.post('/getusertrips', tripController.getusertrips)


//Chat controller
const chatRoomController = require('./Controller/chatRoomController')
routers.post('/getchatRoom', chatRoomController.getAllChat)
routers.post('/addchatRoom', chatRoomController.postMsg)

module.exports = routers;