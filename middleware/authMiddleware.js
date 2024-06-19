const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        console.log("decoded" , decoded)
        next();
    } catch (err) {
        res.status(401).json({ error: 'Not authorized' });
    }
};

// exports.admin = (req, res, next) => {
//     if (req.user && req.user.isAdmin) {
//         next();
//     } else {
//         res.status(403).json({ error: 'Not authorized as admin' });
//     }
// };
