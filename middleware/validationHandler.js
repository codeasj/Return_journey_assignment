const ErrorHandler = require("../utils/errorhandler");

module.exports.validationMiddleware = (validator)=> (req,res,next)=>{
    try {
        const {error} = validator(req.body)
        if (error) {
            throw new ErrorHandler(error.details?.[0]?.message.replace(/"/g, ""), 412)
        }
        next()
    } catch (error) {
        return next(error)
    }

}