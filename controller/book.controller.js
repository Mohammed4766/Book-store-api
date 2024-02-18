const { Book, validateAddBooke, validateUpdataBooke } = require("../models/Book.model");

/**
 * @desc get all books
 * @router /api/books
 * @method Get
 * @access public
 */
const getAllBooks = async(req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc search for book
 * @router /api/books/:id
 * @method Get
 * @access public
 */
const searchForBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc add book
 * @router /api/books/
 * @method Post
 * @access public
 */
const addBook = async (req, res) => {
    const { error } = validateAddBooke(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover,
        });
        const result = await book.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

/**
 * @desc updata a book
 * @router /api/books/:id
 * @method put
 * @access public
 */
const updataBook = async(req, res) => {
    const { error } = validateUpdataBooke(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book has been updated", Book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/**
 * @desc delete a book
 * @router /api/books/:id
 * @method delete
 * @access public
 */
const deleteBook = async(req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book has been deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {getAllBooks , searchForBook, addBook , updataBook , deleteBook}  ;
