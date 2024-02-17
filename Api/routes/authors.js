const express = require('express');
const router = express.Router();
const {Author , validateUpdataAuthor , validateAddAuthor} = require("../../models/Author.model");

/**
 * @desc get all authors
 * @router /api/authors/
 * @method Get
 * @access public
 */
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc get  author by id
 * @router /api/authors/:id
 * @method Get
 * @access public
 */
router.get('/:id', async (req, res) => {
    try {
        const authors = await Author.findById(req.params.id);
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc add author
 * @router /api/authors/
 * @method Post
 * @access public
 */
router.post('/', async (req, res) => {
    const { error } = validateAddAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        });
        const result = await author.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @desc update an author
 * @router /api/authors/:id
 * @method put
 * @access public
 */
router.put('/:id', async (req, res) => {
    const { error } = validateUpdataAuthor(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedAuthor) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json({ message: "Author has been updated", author: updatedAuthor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @desc delete an author
 * @router /api/authors/:id
 * @method delete
 * @access public
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json({ message: "Author has been deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
