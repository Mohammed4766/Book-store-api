const mongoose = require("mongoose");
const Joi = require('joi');

const Schema = mongoose.Schema;

const authorSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 200,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 200,
        required: true,
    },
    imgae: {
        type: String,
        default: "default.avater.png"
    },
    email: {
        type: String,
        required: true,
        lowerase: true,
        unique: true
    },
}, {
    timestamps: true
});

const Author = mongoose.model("author", authorSchema);

// Validate Update author
function validateUpdataAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(2).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    });
    return schema.validate(obj);
}

// Validate Add author
function validateAddAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(2).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    });
    return schema.validate(obj);
}


module.exports = { Author, validateUpdataAuthor, validateAddAuthor };