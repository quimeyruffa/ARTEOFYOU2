const ctrl = {};
const path = require('path')
const md5 = require('md5')
const { randomNumber } = require('../helpers/libs')
const fs = require('fs-extra')
const { Image, Comment } = require('../models/index')
const sidebar  = require('../helpers/sidebars')

ctrl.index = async (req, res) => {
    let viewModel= {image: {}, comments: {}};
    const image = await Image.findOne({ _id: req.params.image_id })
    console.log("image");
    console.log(image)
    if (image) {
        image.views = image.views + 1;
        viewModel.image = image;
        await  image.save();
        const comments = await Comment.find({ image_id: image._id })
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel)
        res.render('image', viewModel)
    } else {
        res.redirect('/')
    }
};
ctrl.create = async (req, res) => {
    const saveImage = async () => {
        const imageURL = randomNumber();
        const image = Image.find({ filename: imageURL })

        if (image.length > 0) {
            saveImage();
        } else {

            console.log(imageURL)
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();
            console.log('aca toy')
            const imagePath = req.file.path;
            const targetPath = path.resolve(`src/public/upload/${imageURL}${ext}`)

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imagePath, targetPath)
                console.log('aca toy', 1)
                const Img = new Image({
                    title: req.body.title,
                    user:req.user.id,
                    description: req.body.description,
                    filename: imageURL + ext
                })
                await Img.save()
                res.redirect('/home')

            } else {
                await fs.unlink(imagePath);
                //resnderizar una pagina
                res.status(500).json({ error: 'Only image are allowed' })
            }

        }

    }
    saveImage();
};

ctrl.like = async(req, res) => {
    const image = await Image.findOne(Image.findOne({ _id: req.params.image_id }))
    if(image){
        image.likes = image.likes + 1
        await image.save()
        res.json({likes: image.likes});
    }else{
        res.status(500).json({error:'internal error'})
    }
}
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({ _id: req.params.image_id })
    if (image) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = image._id;
        await newComment.save()
        res.redirect('/images/' + image._id);

    }
}
ctrl.remove = async (req, res) => {
   const image= await Image.findOne({ _id: req.params.image_id })
   console.log(image.filename)
    if (image){
        await fs.unlink(path.resolve('./src/public/upload/'+image.filename));
        await Comment.deleteOne({image_id: req.params.image_id})
        await image.remove();
        res.json(true)
        res.redirect('/home')
    }
}

module.exports = ctrl