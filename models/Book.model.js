const mongoose = require("mongoose");
const Joi = require('joi');

const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 200,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        ref : "Author",
        required: true,
    },
    description: {
        type: String,
        trim: true,
        minlength: 10,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cover : {
        type: String,
        required: true,
        enum : ["soft cover","hard cover"]
    }
}, {
    timestamps: true
});

const Book = mongoose.model("book", bookSchema);

//validate Add Booke
function validateAddBooke(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author : Joi.string().trim().min(3).max(200).required(),
        description: Joi.string().trim().min(10).max(200).required(),
        price: Joi.number().min(0).max(2000).required(),
        cover :Joi.string().valid("soft cover","hard cover").required(),
    });

    return schema.validate(obj);
}

//validate updata Booke
function validateUpdataBooke(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        author : Joi.string().trim().min(3).max(200),
        description: Joi.string().trim().min(10).max(200),
        price: Joi.number().min(0).max(2000),
        cover :Joi.string().valid("soft cover","hard cover"),
    });

    return schema.validate(obj);
}


module.exports = { Book, validateAddBooke, validateUpdataBooke };