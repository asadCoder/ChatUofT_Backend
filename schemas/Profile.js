const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    utorid: {
        type: String,
        required: true,
        unique: true
    }, 
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        //required: true
        default: "Male"
    },
    profile_pic: {
        type: String,
        default: '',
        // required: true
    },
    campus: {
        type: String,
        default: "UTSG"
        //required: true
    },
    program: {
        type: String,
        default: "Computer Science"
        //required: true
    },
    courses: {
        type: [String],
        default: ['']
        //required: true
    },
    expected_graduation: {
        type: String,
        default: "2025"
        //required: false
    },
    interests: {
        type: [String],
        default: ['']
        //required: false
    },
    bio: {
        type: String,
        default: ''
        //required: true
    },
    tagline: {
        type: String,
        default: ''
        //required: true
    },
    chatid: {
        type: Array,
        default: []
    },
    match_id: {
        type: String,
        default: ''
    },
    allmessages:{
        type: Array,
        default: []
    }
});

mongoose.model("Profile", ProfileSchema);