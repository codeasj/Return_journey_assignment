const axios = require("axios");


const ValidateIp = async(ip) =>{
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}/json`);
        return {country} = response.data;
        // Implement further validation logic here if needed
      } catch (error) {
        console.error('Error validating IP address:', error);
      }
}

module.exports = ValidateIp