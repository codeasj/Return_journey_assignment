const Joi = require('joi');

const phoneSchema = Joi.string()
  .regex(/^[0-9]{10}$/) // Allow only 10 digits
  .message('Phone number must be exactly 10 digits long')
  .required();

const nameSchema = Joi.string()
  .min(2)
  .max(50)
  .required();

const otpSchema = Joi.string()
  .regex(/^[0-9]{4}$/)
  .message('OTP must be exactly 4 digits long')
  .required();

const OtpValiator =(payload) => {
    const validatePhone = Joi.object({
        phoneNumber: phoneSchema
    })
    return validatePhone.validate(payload);
}

// Define the overall schema for the payload
const UserValidator = (payload) => {
    const validateUser = Joi.object({
        phoneNumber: phoneSchema,
        name: nameSchema,
        otp: otpSchema,
    });
    return validateUser.validate(payload);
}

module.exports = {OtpValiator , UserValidator};

