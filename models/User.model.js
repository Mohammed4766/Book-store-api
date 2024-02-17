const mongoose = require("mongoose");
const Joi = require('joi');

const Schema = mongoose.Schema;


const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowerase : true,
        unique : true,
        trime :true,
        minlength: 3,
        maxlength: 200,
    },
    userName : {
        type : String,
        required : true,
        trime :true,
        minlength: 3,
        maxlength: 200,
    },

    password : {
        type : String,
        required : true,
        trime : true ,
        minlength: 10,
        maxlength: 200,
    },

    isAdmin :{
        type : Boolean,
        default : false
    }
});

const User = mongoose.model("user" , userSchema);

//validate Register user
function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().trim().min(3).max(200).required(),
        userName : Joi.string().trim().min(3).max(200).required(),
        password: Joi.string().trim().min(10).max(200).required(),
    });

    return schema.validate(obj);
}

//validate Login user
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().trim().min(3).max(200),
        password: Joi.string().trim().min(10).max(200),
    });

    return schema.validate(obj);
}


//validate updata user
function validateUpdataUser(obj) {
    const schema = Joi.object({
        email: Joi.string().email().trim().min(3).max(200),
        userName : Joi.string().trim().min(3).max(200),
        password: Joi.string().trim().min(10).max(200),
    });

    return schema.validate(obj);
}


module.exports = {User , validateRegisterUser ,validateLoginUser , validateUpdataUser};