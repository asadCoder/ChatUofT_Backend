const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const GroupChat = mongoose.model("GroupChat");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require("nodemailer");
const Profile = mongoose.model("Profile");
// const bcrypt = require("bcrypt");


router.post('/savemessagetodb', async (req, res) => {
    const { senderid, message, chatid, recieverid } = req.body;
    console.log("MESSAGE RECEIVED - ", req.body);
    try {
        const newMessage = new Message({
            senderid,
            message,
            chatid,
            recieverid
        })
        await newMessage.save();
        res.send({ message: "Message saved successfully" });
    } catch (err) {
        res.status(422).send(err.message);
    }
});


router.post('/getmessages', async (req, res) => {
    const { chatid } = req.body;
    console.log("ROOM ID RECEIVED - ", chatid);

    Message.find({chatid: chatid})
        .then(messages => {
            res.status(200).send(messages);
        })
        .catch(err => {
            console.log(err);
        });
});


router.post('/setusermessages', async (req, res) => {
    const { userid, receiverid, lastmessage, chatid} = req.body;
    for(const fuserid of receiverid){
        console.log("MESSAGE ID RECEIVED - ", fuserid);
        Profile.find({ _id: userid })
            .then(user => {
                user.allmessages.map((item) => {
                    if(item.fuserid == fuserid){
                        user.allmessages.pull(item);
                    }
                })
                const date = Date.now();
                user.chatid.push({ userid , fuserid, lastmessage, chatid , date });
                user.save()
                res.status(200).send({ message: "Message saved successfully" });
            })
            .catch(err => {
                console.log(err);
                res.status(422).send(err.message);
            });
    }
});


router.post('/getusermessages', async (req, res) => {
    const { chatid } = req.body;
    console.log("USER ID RECEIVED - ", chatid);
    Profile.find({ _id: chatid })
        .then(user => {
            res.status(200).send(user.chatid);
        })
        .catch(err => {
            console.log(err);
            res.status(422).send(err.message);
        });
});

module.exports = router;