const appRoute = require('express').Router();


const { signUp, login, getPresonalProfile } = require('../../controllers/auth')


appRoute.post('/signup', signUp);

appRoute.post('/login', login);

appRoute.get('/personal-profile', getPresonalProfile);

module.exports = appRoute;