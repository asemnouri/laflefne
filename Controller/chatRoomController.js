const { trips } = require('../DataModel')
const UserModel = require('../DataModel').users
exports.getAllChat = (req, res) => {
    let name = req.body.name
    console.log("naaaaaaaaaame",name)
    trips.findOne({ name })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).send("Err loading Msgs"))
}

//the chat room for each trip will be created with the trip add 
exports.postMsg = async (req, res) => {
    let name = req.body.name
    console.log(req.body.name)
    console.log(req.body.msg)
    req.body.msg.img=""
    await UserModel.findOne({userName:req.body.msg.name})
    .then(data=>req.body.msg.img=data.userimage)
    .catch(err=>console.log(err))
    trips.findOne({ name })
        .then(data => {
            let obj = data.chatData
            obj.push(req.body.msg)
            console.log(obj)
            data.updateOne({ chatData: obj })
                .then((data) => {
                    res.json(data)
                    console.log('saved')
                })
                .catch((err) => {
                    console.log('errrrrrr')
                })
        })
}