const mongoose = require('mongoose');
const path = require('path');

const images = new mongoose.Schema({
    title:{type:String}, 
    description:{type: String},
    filename:{type: String},
    views:{type: Number, default:0},
    likes:{type: Number, default:0},
    timestamp: {type: Date, default: Date.now}
})


images.virtual('uniqueId')
    .get(function (){
        return this.filename.replace(path.extname(this.filename), '')
    })
module.exports = mongoose.model('pictures', images);