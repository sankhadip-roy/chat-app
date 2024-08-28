const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, 'sankha', {
        expiresIn: '30d'
    }); // process.env.JWT_SECRET later
};
module.exports = generateToken;


