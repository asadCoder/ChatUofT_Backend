const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Profile = mongoose.model("Profile");

router.get('/profile', (req, res) => {
    //res.send("verify called");
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
/*
router.put('/profile', (req, res) => {
    const utorid = req.user.utorid;
    const { name, age, email } = req.body;
    User.findByIDAndUpdate(utorid, { name, age, email }, { new: true })
    .then(user => {
        res.json({ message: "Updated successfully" });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error updating user" });
    });
});*/

router.delete('/profile', (req, res) => {
    res.send("verify called");
    res.send("verify called");
});
/*
// GET all items
router.get('/', (req, res) => {
    schema.find({}, (err, items) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.send(items);
    });
});

// GET a single item by ID
router.get('/:id', (req, res) => {
    schema.findById(req.params.id, (err, item) => {
    if (err) {
        return res.status(500).send(err);
    }
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.send(item);
    });
});

// POST a new item
router.post('/', (req, res) => {
    const newItem = new schema(req.body);
    newItem.save((err, item) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.send(item);
    });
});

// PUT (update) an existing item
router.put('/:id', (req, res) => {
    schema.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
    if (err) {
        return res.status(500).send(err);
    }
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.send(item);
    });
});

// DELETE an item
router.delete('/:id', (req, res) => {
    schema.findByIdAndRemove(req.params.id, (err, item) => {
    if (err) {
        return res.status(500).send(err);
    }
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.send(item);
    });
});*/
module.exports = router;