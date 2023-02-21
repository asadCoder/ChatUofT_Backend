const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');

require('dotenv').config();

const Profile = mongoose.model("Profile");
;

router.get('/profile', (req, res) => {
    res.send(req.body);
});

router.post('/addinterest', async (req, res) => {
    const interests = req.body.interests;
    const db = mongoose.connection.db;
    db.collection('profiles').find().toArray((courses, results) => {
        for (const result of results) {
            if (result.utorid === req.body.utorid) {
                const interest_array = result.interests || [];
                for (const interest of interests) {
                    if (interest_array[0] == "") {
                        interest_array[0] = interest;
                    }
                    else interest_array.push(interest);
                }
                db.collection('profiles').updateOne({_id: result._id}, {$set: {interests: interest_array}});
                return res.status(200).json({message: "interests added"});
            }
        }
    });
});

router.post('/addcourse', async (req, res) => {
    const course = req.body.course;
    const db = mongoose.connection.db;
    db.collection('profiles').find().toArray((courses, results) => {
        for (const result of results) {
            if (result.utorid === req.body.utorid) {
                const course_array = result.courses || [];
                if (course_array[0] == "") {
                    course_array[0] = course;
                }
                else course_array.push(course);
                db.collection('profiles').updateOne({_id: result._id}, {$set: {chat_id: course_array}});
                db.collection('profiles').updateOne({_id: result._id}, {$set: {courses: course_array}});
                return res.status(200).json({message: "course added"});
            }
        }
    });
});

router.post('/fetchprofile', async (req, res) => {
    const utorid = req.body.userId;
    const db = mongoose.connection.db;
    db.collection('profiles').find().toArray((courses, results) => {
        for (const result of results) {
            if (result.utorid === utorid) {
                return res.status(200).json({result});
            }
        }
    });
});

router.post('/fetchMockChat', async (req, res) => {
    return res.status(200).json({
        id: "1",
        name: "Novu Hangouts",
        messages: [
            {
                id: "1a",
                text: "Hello guys, welcome!",
                time: "07:50",
                user: "Tomer",
            },
            {
                id: "1b",
                text: "Hi Tomer, thank you!",
                time: "08:50",
                user: "David",
            },
        ],
    },
    {
        id: "2",
        name: "Hacksquad Team 1",
        messages: [
            {
                id: "2a",
                text: "Guys, who's awake?",
                time: "12:50",
                user: "Team Leader",
            },
            {
                id: "2b",
                text: "What's up? ",
                time: "03:50",
                user: "Victoria",
            },
        ]
    }
)});

router.post('/newprofile', async (req, res) => {
    const {utorid, name, age} = req.body || {};
    if (!utorid || !name || !age) {
        return res.status(422).json({error:"Please add all the fields"});
    }
    else {
        const newProfile = new Profile({
            utorid,
            name,
            age,
        })
        try {
            await newProfile.save();
            const token = jwt.sign({ _id: newProfile._id }, process.env.JWT_SECRET);
            return res.status(200).json({ message: "new profile", token });
        }
        catch (err) {
            console.log(err);
            return res.status(422).json({ error: "Error saving user" });
        }
    }

});

router.delete('/profile', (req, res) => {
    res.send("verify called");
    res.send("verify called");
});

module.exports = router;