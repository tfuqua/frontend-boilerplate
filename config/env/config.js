//Load config based on environment
const configDir = './' + process.env.NODE_ENV;
var config = require(configDir);

module.exports = config;
