const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    targetDate: {type: Date, required: true},//QR уншуулсан өдөр
    status: {type: String, required: true},//arrived, gone
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},//QR уншуулсан user
    latitude: {type: Number, required: true},//QR уншуулсан өргөрөг
    longitude: {type: Number, required: true},//QR уншуулсан уртраг
    created: {type: Date, default: () => Date.now(), immutable: true}
});

module.exports = mongoose.model("Attendee", schema);