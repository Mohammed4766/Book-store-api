const express = require('express');
const router = express.Router();
const {getAllAuthors , getAuthorById , addAuthor , updateAuthor , deleteAuthor} = require("../../controller/authors.controller");
const {tokenVerificationAndAdmin} = require('../../middleware/TokenVerification');


router.get('/', getAllAuthors);


router.get('/:id', getAuthorById);


router.post('/', tokenVerificationAndAdmin,addAuthor);


router.put('/:id',tokenVerificationAndAdmin, updateAuthor);


router.delete('/:id',tokenVerificationAndAdmin, deleteAuthor);



module.exports = router;
