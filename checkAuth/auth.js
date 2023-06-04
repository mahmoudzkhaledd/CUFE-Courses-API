const jwt = require('jsonwebtoken');

/* for normal user to be logged in */
function checkAuth(req, res, next,chk = false) {
    try {
        const token = req.headers['token'].split(' ')[1];
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (verify) {
            if(chk)next(verify);
            else next();
        }
        else return res.status(400).json({ message: "unauthorized" });
    } catch (err) {
        return res.status(400).json({ message: "unauthorized" });
    }
}


/* check admin authentication */
function checkAdminAuth(req, res, next,chk = false) {
    try {
        const token = req.headers['token'].split(' ')[1];
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN);
        
        if (verify && (verify.isAdmin || verify.isSuperAdmin)) {
            if(chk)next(verify);
            else next();
        }
        else return res.status(400).json({ message: "unauthorized" });
    } catch (err) {
        return res.status(400).json({ message: "unauthorized" });
    }
} 

/* check super admin authentication */
function checkSuperAdminAuth(req, res, next,chk = false) {
    try {
        const token = req.headers['token'].split(' ')[1];
        const verify = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (verify && verify.isSuperAdmin) {
            if(chk) next(verify);
            else next();
        }
        else return res.status(400).json({ message: "unauthorized" });
    } catch (err) {
        return res.status(400).json({ message: "unauthorized" });
    }
}


module.exports = {
    checkAuth,
    checkAdminAuth,
    checkSuperAdminAuth,
}