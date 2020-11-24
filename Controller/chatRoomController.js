const { trips } = require('../DataModel')

exports.getAllChat = (req, res) => {
    let name = req.body.name
    console.log("naaaaaaaaaame",name)
    trips.findOne({ name })
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).send("Err loading Msgs"))
}

//the chat room for each trip will be created with the trip add 
exports.postMsg = (req, res) => {
    let name = req.body.name
    console.log(req.body.name)
    console.log(req.body.msg)
    trips.findOne({ name })
        .then(data => {
            console.log(data)
            console.log("asdasdasdasd",  req.body.msg)
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