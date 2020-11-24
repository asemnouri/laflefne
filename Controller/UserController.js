//requiring the user schema
const UserModel = require('../DataModel').users
//for the hashing password
const bcrypt = require('bcryptjs')
//JWT
const jwt = require('jsonwebtoken');

//sign up functionallity
exports.signUpUser = async (req, res) => {
    //salting
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.userPass, salt)
    // User Data when Signing up
    userMail = req.body.userMail
    userpas = req.body.userPass
    console.log(req.body)
    if (!req.body.userfirstName) {
        return res.status(451).send('error')
    }
    if (!userpas) {
        return res.status(421).send('error')
    }
    if (!userMail) {
        return res.status(411).send('error')
    }
    //to check if the email is already used.
    UserModel.findOne({ userMail: req.body.userMail }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).send('error')
        }
        //not used before - create a new user
        if (!user) {
            var newuser = new UserModel()
            newuser.userName = req.body.userName
            newuser.userMail = req.body.userMail
            newuser.userimage = req.body.userimage
            newuser.userPass = hashedPass
            newuser.userNum = req.body.userNum
            newuser.trips = []
            newuser.newsLetter = req.body.newsLetter,
            newuser.admin=false
            newuser.save((err, saveduse) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send('error')
                }
                var token = jwt.sign({ _id: saveduse._id }, process.env.TOKEN_SECRET)
                res.cookie('authToken', token).json({userId:saveduse._id})
                // return res.status(200).send('created')
            })
        }
        else
            return res.status(406).send('user existed')
    }) 
}

//loging in 
exports.loginUser = (req, res) => {
    var userMail = req.body.userMail
    if (!userMail) {
        return res.status(410).send('error')
    }
    UserModel.findOne({ userMail: userMail }, async (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).send('error')
        }
        if (!user) {
            console.log('user not found')
            return res.status(404).send('not found user')
        }
        else {
            const vaildPass = await bcrypt.compare(req.body.userPass, user.userPass)
            if (!vaildPass) {
                res.status(400).send('invalid Password')
            }
            else {
                var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
                res.cookie('authToken', token)
                return res.status(200).json({token,userId:user._id})
            }
        }
    })
}

//logout to remove token (token value = empty)
exports.userlogout = (req, res) => {
    res.cookie('authToken', '',{maxAge:1})
    res.status(200).send(req.user)
}

//to check if the user is logged in 
exports.checkuser = (req, res) => { return (req.user) }

//get user info and display it to user profile
exports.getuserinfo = (req, res) => {
    console.log("sdfghjkl;",req.body.id)
    UserModel.findOne({ _id: req.body.id }, (err, userData) => {
        if (err) {
            console.log(err)
            return res.status(500).send('error')
        }
        if (!userData) {
            console.log('user not found')
            return res.status(404).send('not found user')
        }
        else {
            console.log("userrrrrrrrrrrrr",userData)
            return res.status(200).send(userData)
        }
    })
}


//remove user
exports.removeUser = (req, res) => {
    //can put email 
    UserModel.findOneAndRemove({ _id: req.body._id })
        .then((data) => {
            console.log('REMOVED:')
            console.log(data)
            res.status(200).send('Removed')
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send('Err in removing')
        })
}