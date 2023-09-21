const twilio = require('twilio');
const ErrorHandler = require("../middleware/error")

// Your Twilio Account SID and Auth Token
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

// Your Twilio Phone Number (you must purchase this from Twilio)
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Function to send an OTP message
function sendMessage(phoneNumber , otp) {
  const messageBody = `Your OTP is: ${otp}`;

  client.messages
    .create({
      to: phoneNumber,
      from: twilioPhoneNumber,
      body: messageBody,
    })
    .then((message) => {
      console.log(`OTP sent to ${phoneNumber}: ${message.sid}`);
    })
    .catch((error) => {
      console.error(`Error sending OTP: ${error.message}`);
    });
}

module.exports = sendMessage

