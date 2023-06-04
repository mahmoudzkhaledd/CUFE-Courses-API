const User = require('../models/User');
const bcrypt = require('bcrypt');
const { countCourses } = require('../controllers/CoursesController');
const { default: mongoose } = require('mongoose');
async function addAdmin(req, res) {
    try {
        const {
            name,
            email,
            password,
            department,
        } = req.body;
        if (name == null || email == null || password == null || department == null) return res.status(400).json({ message: 'please enter full data' });
        const tempUser = await User.findOne({ email });
        if (tempUser) return res.status(400).json({ message: "This email is already taken, please try to login instead" });

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const user = User({
            name,
            email,
            password: hashedPass,
            department,
            isAdmin: true,
            isSuperAdmin: false,
        });

        const savedUser = await user.save();

        return res.status(200).json(savedUser.toJSON());

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function deleteAdmin(req, res) {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user.isSuperAdmin) await user.remove((err) => { });
        else return res.status(200).json({ message: "can't delete super admin user" });
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function updateUser(req, res) {
    try {
        const id = req.params.id;

        const {
            name,
            password,
            department,
            isAdmin
        } = req.body;
        if (!id) return res.status(400).json({ message: "Please enter a valid id" });
        const user = await User.findById(id);
        if (name) user.name = name;
        if (password) user.password = password;
        if (department) user.department = department;
        if (isAdmin) user.isAdmin = isAdmin;
        await user.save();

        return res.status(200).json({ message: "success" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
async function getAllAdmins(req, res) {
    const page = req.query.page || 0;
    const users = await User.find({
        isAdmin: true,
    }, { password: 0 }).skip(20 * page).limit(20);
    
    res.status(200).json(users);
}

async function getAllUsers(req, res) {
    const page = req.query.page || 0;
    const users = await User.find({
        "$and": [
            { isAdmin: false },
            { isSuperAdmin: false },
        ]
    }, { password: 0 }).skip(20 * page).limit(20);
    
    return res.status(200).json(users);
}


async function getUserByID(id){
    try {
        const user = await User.findById(id, { password: 0 });
        return user;
    } catch (err) {
        return null;
    }
}


async function getUser(req, res) {
    const user = await getUserByID(req.params.id);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(400).json({
            message: 'user not found'
        });
    }
}
async function getDiskSpace(req, res) {
    try {  
        const conn = await mongoose.connection.db.stats();
        res.json({conn});
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

async function getAdminCount(req, res) {
    try {
        const count = await User.find({ isAdmin: true }).count();
        res.status(200).json({ count });
    } catch (err) {
        res.status(400).json({
            message: 'error please try again later'
        });
    }
}

async function getUsersCount(req, res) {
    try {
        const count = await User.find({
            "$and": [
                { isAdmin: false },
                { isSuperAdmin: false },
            ]
        }).count();
        res.status(200).json({ count });
    } catch (err) {
        res.status(400).json({
            message: 'error please try again later'
        });
    }
}

async function getAppSummary(req, res) {
    try {

        const usersCount = await User.find({
            "$and": [
                { isAdmin: false },
                { isSuperAdmin: false },
            ]
        }).count();

        const adminCount = await User.find({ isAdmin: true }).count();

        const diskSpace = 0.4;
        const coursesCount = await countCourses();

        res.status(200).json({
            usersCount,
            adminCount,
            diskSpace,
            coursesCount
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}


module.exports = {
    addAdmin,
    deleteAdmin,
    updateUser,
    getAllAdmins,
    getAllUsers,
    getUser,
    getDiskSpace,
    getAdminCount,
    getUsersCount,
    getAppSummary,
    getUserByID,
}