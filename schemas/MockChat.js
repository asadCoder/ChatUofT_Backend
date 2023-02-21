const mongoose = require("mongoose");

const MockChat =  new mongoose.Schema ({

    id: String,
    name: String, 
    messages: [{ id: String, text: String, time: String, user: String}]

});

mongoose.model("MockChat", MockChat);