
const { User, validateUpdataUser } = require("../models/User.model");


/**
 * @desc ubdate user
 * @router /api/user/:id
 * @method Put
 * @access private
 */
const ubdateUser =async (req, res) => {
    try {
        const { error } = validateUpdataUser(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const ubdateedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
        res.status(200).json(ubdateedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc get all user
 * @router /api/user/
 * @method Get
 * @access private ((only admin)
 */
const getAllUser = async (req, res) => {
    try {
        const user = await User.find().select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 


/**
 * @desc get user by id
 * @router /api/user/:id
 * @method Get
 * @access private(only admin and user himselft)
 */
 const getUserById =async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * @desc delete user 
 * @router /api/user/:id
 * @method delete
 * @access private(only admin and user himselft)
 */

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (user) {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({message : "user has been deleted successfully"});
        } else {
            res.status(404).json({ message: "user not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {ubdateUser , getAllUser , getUserById , deleteUser};