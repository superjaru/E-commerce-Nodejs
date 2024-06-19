const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production process.env.NODE_ENV === 'production'
            sameSite: 'Strict',
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.log("error while",err.message )
        res.status(400).json({ error: err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { username ,email, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Your Password is not correct' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Use secure cookies in production process.env.NODE_ENV === 'production'
            sameSite: 'Strict',
        });

        res.status(200).json({ message: 'User login successfully',  token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
