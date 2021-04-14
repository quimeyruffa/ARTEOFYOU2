const usersCtrl = {};

const passport = require('passport')

const User = require('../models/user')

const {Image} = require('../models');
const sidebar = require('../helpers/sidebars')

usersCtrl.renderSignUpForm =async (req, res) => {
    const images = await Image.find().lean().sort({timestamp:-1});
    let viewModel = {images:[]}
    viewModel.images = images;
    viewModel = await sidebar(viewModel)
    res.render('users/signUp', viewModel);
}
usersCtrl.signUp=async (req, res) =>{
    const errors = []
    const success =[]

   const {name, email, password, confirm_password} = req.body;
    
   if(password != confirm_password){
       errors.push({text:'Passwords do not match'})
   }
   if(password.length < 4){
       errors.push({text:'Passwords must be at least 4 characters'})
   }
   if(errors.length > 0){
       res.render('users/signup',{
           errors,
           name,
           email
       })
   }else{
       const emailUser =await User.findOne({
           email:email
       })
       if(emailUser){
           errors.push({text:'The email is already in use'})
          
           res.render('users/signup',{
            errors,
            name,
            password,
            confirm_password
        })
       }else{
           const newUser = new User({name,email,password})
           newUser.password = await newUser.encryptPassword(password)
           await newUser.save();
           
           success.push({text:'You are registered'})
          
           res.render('users/signin',{
            success
        })
        }
   }
}
usersCtrl.renderSignInForm = async (req, res) =>{
    const images = await Image.find().lean().sort({timestamp:-1});
    let viewModel = {images:[]}
    viewModel.images = images;
    viewModel = await sidebar(viewModel)
    res.render('users/signIn', viewModel);
}
usersCtrl.signIn = passport.authenticate('local',{
    failureRedirect:'/users/signin',
    successRedirect:'/home',
    failureFlash:true
}) 

usersCtrl.logOut=(req, res)=>{
    req.logOut();
    req.flash('success_msg', 'You are logged out now.')
    res.redirect('/')
}

module.exports = usersCtrl