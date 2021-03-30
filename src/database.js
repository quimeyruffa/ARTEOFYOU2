const moongose = require('mongoose');
const { database } = require('./keys');

moongose.connect(MONGODB_URI,{
    useNewUrlParser:true
})
.then(db => console.log('db is connected'))
.catch(err => console.log(err));