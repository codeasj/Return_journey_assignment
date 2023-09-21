const crypto = require('crypto');

const secretKey = process.env.SECRET_KEY

// Function to generate a random 4-digit OTP
const generateOtp = () => {
    return Math.floor(Math.pow(10, 3) + Math.random() * 9000);
}

// Function to generate an OTP hash
const generateOtpHash = (otp) => {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(otp.toString());
    const otpHash = hmac.digest('hex');
    return otpHash;
}

// Function to compare user input OTP with a generated OTP and secret key
const compareOtp = (userInputOTP, generatedOTPInDB) => {
    const generatedOtpHash = generateOtpHash(userInputOTP, secretKey);
    return  generatedOTPInDB === generatedOtpHash;
}

module.exports = {
    generateOtp,
    generateOtpHash,
    compareOtp,
};
