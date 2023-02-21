const mongoose = require("mongoose");

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
        type: Array,
        required: true
    }
},{
    timestamps: true
})




mongoose.model("Message", messageSchema);