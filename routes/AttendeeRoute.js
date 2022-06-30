const router = require("express").Router();
const authToken = require("../utils/Middleware");
let Attendee = require("../models/Attendee");

router.post("/save", authToken, (req, res) => {
    if (!arePointsNear(req.body, {latitude: 47.909297, longitude: 106.9317557}, 0.3)) {//1km
        return res.status(422).send("Ажлын байртай ойрхон биш байна.");
    }

    const status = new Date().getHours() < 12 ? "arrived" : "gone";
    const targetDate = new Date();

    const model = new Attendee({
        targetDate: targetDate,
        status,
        user: req.user,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    model.save()
        .then(() => {
            res.json({
                message: "Амжилттай",
                targetDate,
                status,
            });
        }).catch(err => res.status(422).send(err.message));
});

function arePointsNear(checkPoint, centerPoint, km) {
    const ky = 40000 / 360;
    const kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
    const dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
    const dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
    console.log(Math.sqrt(dx * dx + dy * dy))
    return Math.sqrt(dx * dx + dy * dy) <= km;
}

module.exports = router;