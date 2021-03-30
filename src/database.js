const moongose = require('mongoose');


moongose.connect(MONGODB_URI,{
    useNewUrlParser:true
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));