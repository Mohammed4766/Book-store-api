const notFound = (req , res , next)=>{
    const error = new Error("not found");
    error.status = 404;
    next(error);
    };

const erroeHandler = (error , req , res , next)=>{
    res.status(error.status || 500);
    res.json({
        error : error.message
    });
};

module.exports = {
    notFound,
    erroeHandler
}