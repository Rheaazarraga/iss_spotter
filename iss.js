//It will contain most of the logic for fetching the data from each API endpoint.

const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(`error found: , ${error}`);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body);
    callback(null, ip['ip']);
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = 'https://freegeoip.app/json/';
  request(url, (error, response, body) => {
    if (error) {
      callback(`error found: , ${error}`);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };