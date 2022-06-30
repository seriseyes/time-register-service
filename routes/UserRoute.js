const router = require("express").Router();
const log = require("../utils/Log");
const bcrypt = require("bcrypt");
const authToken = require("../utils/Middleware");
let User = require("../models/User");

/**
 * Mn-Medsoft-оос username, password ашиглаж token авах.
 * Авсан token-г client-н cookie-д хадгалах.
 */
router.route("/save").post(async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const model = new User(req.body);
        model.save()
            .then(() => res.status(200).send("Амжилттай хадгалагдлаа"))
            .catch(err => res.status(422).send("Алдаа: " + err.message));
    } catch (err) {
        log.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/data", authToken, async (req, res) => {
    const user = await User.findOne({username: req.user.username}).exec();
    res.json(user);
});

module.exports = router;