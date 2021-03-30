const ctrl={};
const {Image} = require('../models');
const sidebar = require('../helpers/sidebars')
ctrl.index = async(req,res)=>{
    const images = await Image.find().lean().sort({timestamp:-1});
    let viewModel = {images:[]}
    viewModel.images = images;
    viewModel = await sidebar(viewModel)
    res.render('index',viewModel);
};


module.exports = ctrl; 