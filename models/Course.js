const mongoose = require('mongoose');
const schema = mongoose.Schema({
    code: {
        type:String,
        required: true,
        unique: true,
    },
    name: {
        type:String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    creditHours: {
        type: Number,
        required: true,
    },
    isElective: {
        type: Boolean,
        required: true,
    },
    isFall: {
        type: Boolean,
        required: true,
    },
    isSpring: {
        type: Boolean,
        required: true,
    },
    isSummer: {
        type: Boolean,
        required: true,
    },
    preRequisites: {
        type: Array,
        required: true,
        default: [],
    },
    departments: {
        type:Array,
        default: []
    }
});


const Course = mongoose.model("course",schema);

module.exports = Course;