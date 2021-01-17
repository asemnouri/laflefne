
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
routers.post('/invite-req', userController.setInvitaion)
routers.post('/makeadmin', userController.makeadmin)
routers.post('/user/invitation', userController.invitation)

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
/*

https://i.pinimg.com/originals/0f/d3/bd/0fd3bdb3cb277b513c800b80a7f68457.jpg--https://i.ytimg.com/vi/dVydxnsVVxQ/maxresdefault.jpg||https://www.quotemaster.org/images/0c/0c36ffdd0d11f03d369cf895d7d31f78.jpg--https://en.bcdn.biz/Images/2017/2/3/cd84756d-25b6-443b-8c29-3bb3fe83ab37.jpg||https://www.inkayniperutours.com/blog/wp-content/uploads/2020/04/iguaz%C3%BA-inkayni-peru-tours.jpg--https://3erc1e4bvanrdzas82cngnw1-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/01-optical-illusion-GettyImages-1154509375-e1586800877813-770.jpg


*/