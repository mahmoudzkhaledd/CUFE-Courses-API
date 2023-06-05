const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function signUp(req, res) {
    try {
        const {
            name,
            email,
            password,
            department,
        } = req.body;

        const tempUser = await User.findOne({ email });
        if (tempUser) return res.status(400).json({ message: "This email is already taken, please try to login instead" });
        
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        const user = User({
            name,
            email,
            password: hashedPass,
            department,
        });

        const savedUser = await user.save();

        return res.status(200).json(savedUser.toJSON());

    } catch (err) {
        return res.status(500).json({ error: err.message });

    }
}

 

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const tempUser = await User.findOne({ email });
        if (!tempUser) return res.status(400).json({ message: "please check email or password" });
        const matchPass = await bcrypt.compare(password, tempUser.password);
        if (!matchPass) return res.status(400).json({ message: "please check email or password" });
        const userTokenModel = { id: tempUser._id, isSuperAdmin: tempUser.isSuperAdmin, isAdmin: tempUser.isAdmin };
        const token = jwt.sign(userTokenModel, process.env.ACCESS_TOKEN);
        delete tempUser.password;
        return res.status(200).json({ token: `Bearer ${token}`, model: tempUser });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


async function getPresonalProfile(req,res){
    try{
        const token = req.headers['token'].split(' ')[1];
        const signUser = await jwt.verify(token);
        const user = await User.findById(signUser.id);
        delete user.password;
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({message: err.message});
    }
}



module.exports = {
    signUp,
    login,
    getPresonalProfile,
}