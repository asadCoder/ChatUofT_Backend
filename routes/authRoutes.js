require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res)=>{
    const {utorid, email, password} = req.body;

    if(!email || !utorid || !password){
        return res.status(422).json({error: "please fill all the fields"});
    }
    else{
        console.log(email, utorid, password);
        User.findOne({
            utorid: utorid,
            email: email
        }).then(async (savedUser)=>{
            if(savedUser){
                return res.status(422).json({message: "user already exists"});
            }
            else{
                try{
                    const user = new User({
                        utorid,
                        email,
                        password
                    })
                    await user.save();
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
                    return res.status(200).json({message: "user added"}, token);
                }catch(err){
                    console.log(err);
                    return res.status(422).json({message: "user not registered"});
                }
            }
        })
    }
})

router.get('/login', (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({message: "please fill all the fields"});
    }
    else{
        User.findOne({
            email, 
            password
        }).then((savedUser)=>{
            if(savedUser){
                console.log(savedUser);
                return res.status(200).json({message: "user exists"});
            }
            else{
                return res.status(422).json({message: "user does not exist"});
            }
        })
    }
})

module.exports = router;



