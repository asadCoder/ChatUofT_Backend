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