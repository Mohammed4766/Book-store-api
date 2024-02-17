const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, validateRegisterUser, validateLoginUser, } = require("../../models/User.model");
require("dotenv").config();


/**
 * @desc register user
 * @router /api/auth/register
 * @method Post
 * @access public
 */
router.post('/register', async (req, res) => {
    try {
        const { error } = validateRegisterUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: "this user already registered" });
        }
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
        });
        const result = await user.save();
        const token = jwt.sign({id : user._id ,isAdmin :  user.isAdmin},process.env.SECRET_KAY);
        const { password, ...other } = result._doc;
        res.status(201).json({ ...other, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @desc login user
 * @router /api/auth/login
 * @method Get
 * @access public
 */
router.post('/login', async (req, res) => {
    try {
        const { error } = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "invalid email or password" });
        }
        const isPaswordMatch = await bcrypt.compare(req.body.password , user.password);


        if(!isPaswordMatch){
            return res.status(400).json({message : "invalid email or password"});
        }


        const token = jwt.sign({id : user._id ,isAdmin :  user.isAdmin},process.env.SECRET_KAY);
        const { password, ...other } = user._doc;
        res.status(200).json({ ...other, token });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
