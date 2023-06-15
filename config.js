const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, './.env');

dotenv.config({
    path: envPath,
});

module.exports = {
    USER_NAME: process.env.USER_NAME,
    USER_PASS: process.env.USER_PASS,
};