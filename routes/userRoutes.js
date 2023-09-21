const router = require("express").Router();
const { sendOtp, verifyUser } = require("../controllers/userControllers");
const {OtpValiator , UserValidator} = require("../validators/userPayloadValidators");
const {validationMiddleware} = require("../middleware/validationHandler");

router.post("/sendotp" , validationMiddleware(OtpValiator) ,  sendOtp);

router.post("/verifyuser" , validationMiddleware(UserValidator) ,  verifyUser);

module.exports = router;