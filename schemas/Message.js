const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// //chat_id must be the concatenation of the sender_id and reciever_id
// const chat_id = new mongoose.Schema({
//     chatid: {
//         type: String,
//         required: true
//     },

// })

const messageSchema = new mongoose.Schema({
    chatid:
    {
        type: String,
        required: true
    },
    senderid: {
        type: String,
        required: true
    },
    message:{
        type: String,
    },
    recieverid:{
        type: String,
        required: true
    }
},{
    timestamps: true
})




mongoose.model("Message", messageSchema);