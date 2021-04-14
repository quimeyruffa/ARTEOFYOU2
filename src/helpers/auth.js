const helpers ={};

helpers.isAuthenticated = (req, res, next) =>{
    let errors =[]
    if(req.isAuthenticated()){
        return next()
    }

    errors.push({text:'Not Authorized'})       
    res.render('users/signin',{
            errors
        })
}


module.exports = helpers;