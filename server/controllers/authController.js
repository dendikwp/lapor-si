const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
config();

exports.signIn = async (req, res) => {
    let { username, password } = req.body;
    try {
        const response = await User.findOne({
            where: { username: username }
        });
        if (response) {
            const login = await bcrypt.compare(password, response.password);
            if (login) {
                const token = jwt.sign({ id: response.id, username: response.username }, process.env.SECRET_KEY);
                return res.status(200).json({
                    token: token
                });
            } else {
                return res.status(404).json({ error: 'Invalid username or password' });
            }
        } else {
            return res.status(404).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.log(error.message);
    }
};