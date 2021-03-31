const moongose = require('mongoose');
const {database} = require('./keys')
const {config} = require('dotenv');
config()

moongose.connect(process.env.MONGODB_URI || database.URI ,{
    useNewUrlParser:true
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));