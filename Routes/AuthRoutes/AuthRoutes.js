const appRoute = require('express').Router();
const {
    getUserByID
} = require("../../controllers/superAdmin")
const {
    checkAuth,
    checkAdminAuth,
    checkSuperAdminAuth,
} = require('../../checkAuth/auth');

appRoute.get('/verify-admin-token', (req, res) => {
    checkAdminAuth(req, res, async (verify) => {
        const user = await getUserByID(verify.id);
        return res.status(200).json(user);
    }, true);
});
appRoute.get('/verify-super-admin-token', (req, res) => {
    checkSuperAdminAuth(req, res, async (verify) => {
        
        const user = await getUserByID(verify.id);
        return res.status(200).json(user);
    }, true);
});
appRoute.get('/verify-user-token', (req, res) => {
    checkAuth(req, res, async (verify) => {
        const user = await getUserByID(verify.id);
        return res.status(200).json(user);
    }, true);
});

module.exports = appRoute;