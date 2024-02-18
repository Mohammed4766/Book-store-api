const express = require('express');
const router = express.Router();
const {ubdateUser , getAllUser , getUserById , deleteUser} = require("../../controller/users.contoller")
const { tokenVerificationAndAuthoroizeation, tokenVerificationAndAdmin } = require('../../middleware/TokenVerification');





router.put('/:id', tokenVerificationAndAuthoroizeation, ubdateUser);



router.get('/', tokenVerificationAndAdmin, getAllUser);


router.get('/:id', tokenVerificationAndAuthoroizeation, getUserById);


router.delete('/:id', tokenVerificationAndAuthoroizeation, deleteUser);




module.exports = router;
