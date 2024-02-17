const jwt = require("jsonwebtoken");
require("dotenv").config();

function tokenVerification(req, res, next) {
    const token = req.headers.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KAY);
            req.user = decoded;
            console.log(req.user);
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
}

//token Verification and Authoroize the user 
function tokenVerificationAndAuthoroizeation(req, res, next) {
    tokenVerification(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "you are not allowed" });
        }
    });
}

//token Verification and Admin 
function tokenVerificationAndAdmin(req, res, next) {
    tokenVerification(req, res, () => {
        console.log(req.user.isAdmin);
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "you are not allowed" });
        }
    });
}

module.exports = { tokenVerificationAndAuthoroizeation , tokenVerificationAndAdmin};
