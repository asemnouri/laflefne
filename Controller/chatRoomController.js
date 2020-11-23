const chatRoom = require('../DataModel')

exports.getAllChat = (req, res) => {
    chatRoomModel.find({}, (err, data) => {
        if (err) {
            res.status(500).send("Err loading Msgs")
        }
        else {
            res.status(200).json(data);
        }
    })
}

//the chat room for each trip will be created with the trip add 
exports.postMsg = (req, res) => {
    // var msg = new chatRoom({
    //     tripId: req.body.tripId,
    //     msgsBody: [],
    // })
}