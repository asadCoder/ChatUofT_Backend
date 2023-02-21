const mongoose = require("mongoose");
//const message_schema = require('./Message')
// const bcrypt = require("bcrypt");

const message_schema = new mongoose.Schema({
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

const gc_schema = new mongoose.Schema({
    chat_ids:
    {
        type: Array,
        required: true
    },
    user_ids: {
        type: Array,
        required: true
    },
    message:{
        type: message_schema
    }

})

mongoose.model("GroupChat", gc_schema);