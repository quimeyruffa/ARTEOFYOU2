const moongose = require('mongoose');
const {config} = require('dotenv');
config()

moongose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));