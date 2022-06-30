const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Token шалгах middleware
 * @param req HTTP Request
 * @param res HTTP Response
 * @param next Дараагийн функц
 */
module.exports = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (token === null) return res.sendStatus(401);


    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = await User.findOne({username: user.username}).exec();
        next();
    });
}