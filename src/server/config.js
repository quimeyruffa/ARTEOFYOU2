const Handlebars = require("handlebars");
const express = require('express')
const morgan = require('morgan');
const multer = require('multer');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('../routes/index');
const errorHandler = require('errorhandler');


module.exports = (app) => {
    
    const {
        allowInsecurePrototypeAccess,
    } = require("@handlebars/allow-prototype-access");

    //Settings
    app.set('port', process.env.PORT || 3001);
    app.set('views', path.join(__dirname, '../views'));

    require('../config/passport')
    
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    }))

    app.set('view engine', '.hbs');

    //middlewares
    app.use(morgan('dev'));
    app.use(multer({ dest: path.join(__dirname, '../public/upload') }).single('image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(session({
        secret:'secret',
        resave:true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session());
    app.use(flash())

    //Global Variables
     app.use((req,res,next)=>{
        res.locals.success_msg= req.flash('success_msg');      
         res.locals.error= req.flash('error');
         res.locals.error_msg= req.flash('error_msg'); 
         res.locals.user = req.user || null;
         next()
     })

    //routes
    routes(app);

    //static files 
    app.use('/public', express.static(path.join(__dirname, '../public')))

    //errorhandlers
    if ('development' === app.get('env')) {
        app.use(errorHandler);
    }
    return app;
}