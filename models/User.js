const mongoose = require('mongoose');
const userShcema = mongoose.Schema({
    name: {
        type:String,
        default : "",
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isSuperAdmin:{
        type: Boolean,
        default: false,
    },
});

const model = mongoose.model("user", userShcema);
module.exports = model;