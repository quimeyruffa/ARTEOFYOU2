const express = require('express')
const router = express.Router();
const {isAuthenticated} = require('../helpers/auth')
const home = require('../controllers/home')
const { renderSignUpForm, renderSignInForm, logOut, signIn, signUp } = require('../controllers/users')
const image = require('../controllers/image')
module.exports = app => {
    //HOME
    router.get('/home',isAuthenticated, home.index);
    router.get('/', home.firstPage);

    //IMAGES
    router.get('/images/:image_id',isAuthenticated, image.index);
    router.post('/images', isAuthenticated,image.create);
    router.post('/images/:image_id/like', isAuthenticated,image.like);
    router.post('/images/:image_id/comment', isAuthenticated,image.comment);
    router.delete('/images/:image_id',isAuthenticated, image.remove);

    //USERS LOGIN
    router.get('/users/signUp', renderSignUpForm)
    router.post('/users/signup', signUp)
    router.get('/users/signIn', renderSignInForm)
    router.post('/users/signin', signIn)
    router.get('/users/logout', logOut)
    app.use(router);
};