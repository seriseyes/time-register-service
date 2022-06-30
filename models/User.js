const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    regNo: {type: String, required: true},
    created: {type: Date, default: () => Date.now(), immutable: true}
});

module.exports = mongoose.model("User", schema);