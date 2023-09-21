const ErrorHandler = require("../utils/errorhandler");
const catchAysncErrors = require("../middleware/catchAsyncError");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const {generateOtp , generateOtpHash , compareOtp} = require("../utils/otpgenerator");
const sendMessage = require("../utils/sendMessages");
const ValidateIp = require("../utils/ipinfo");
const countryCodes = require('country-codes-list')

const sendOtp = catchAysncErrors(
    async(req, res , next) => {
        const {phoneNumber} = req.body;
        if(!phoneNumber){
            return next(new ErrorHandler("Please enter Phone number" ,  400));
        }
        const numberExist = await User.findOne({phone : phoneNumber});
        if(numberExist){
            return next(new ErrorHandler("User already registered with the same phone number", 409))
        }
        const retryNumber = await Otp.findOne({phone : phoneNumber});
        if(retryNumber){
            await Otp.findOneAndDelete({phone : phoneNumber})
        }
        const otp = generateOtp()
        const ipAddress = req.ip || req.connection.remoteAddress;
        const {country} =  await ValidateIp(ipAddress);
        const CountryCode = countryCodes.customList('countryCode',  `+{countryCallingCode}`)
        sendMessage(`${CountryCode[country]}` + `${phoneNumber}` , otp)
        const otpHash = generateOtpHash(otp);
        console.log(otpHash);
        await Otp.create({
            phone :phoneNumber, 
            otp : otpHash
        })
        res.json({
            message : `OTP sent to Phone number ${phoneNumber}`
        })
    }   
);



const verifyUser = catchAysncErrors(
    async(req, res , next) => {
        const { phoneNumber , otp , name } = req.body;
        if(!phoneNumber){
            return next(new ErrorHandler("Please enter Phone number" ,  400));
        }
        const otpExist = await Otp.findOne({phone : phoneNumber});
        if(!compareOtp(otp,  otpExist.otp )){
            return next(new ErrorHandler("Incorrect otp", 400))
        }
        const numberExist = await User.findOne({phone : phoneNumber});
        if(numberExist){
            return next(new ErrorHandler("User already registered with the same phone number", 409))
        }
        const ipAddress = req.ip || req.connection.remoteAddress;
        User.create({
            name,
            phone : phoneNumber,
            ipAddress : ipAddress,
        })
        res.send({
            message : `User with Name: ${name} , Phone number: ${phoneNumber} and Ip : ${ipAddress} is verified`
        })
    }   
);

module.exports = {sendOtp , verifyUser};