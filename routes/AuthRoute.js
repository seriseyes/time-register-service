const router = require("express").Router();
const log = require("../utils/Log");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let User = require("../models/User");

/**
 * Mn-Medsoft-оос username, password ашиглаж token авах.
 * Авсан token-г client-н cookie-д хадгалах.
 */
router.route("/login").post(async (req, res) => {
        const {username, password} = req.body;
        const user = await User.findOne({username}).exec();

        if (!user) return res.status(401).send("Хэрэглэгчийн бүртгэл олдсонгүй.");

        if (await bcrypt.compare(password, user.password)) {
            jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "7 days"}, (err, token) => {
                res.json({token});
            });
        } else {
            return res.status(401).send("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
        }
    }
);

module.exports = router;