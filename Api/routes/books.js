const express = require('express');
const router = express.Router();
const {getAllBooks , searchForBook , addBook , updataBook , deleteBook} = require('../../controller/book.controller');
const { tokenVerificationAndAuthoroizeation, tokenVerificationAndAdmin } = require('../../middleware/TokenVerification');




router.get('/', getAllBooks);

router.get('/:id', searchForBook);

router.post('/', tokenVerificationAndAdmin,addBook);

router.put('/:id', tokenVerificationAndAdmin,updataBook);

router.delete('/:id', tokenVerificationAndAdmin,deleteBook);



module.exports = router;
