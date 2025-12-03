const {Article,Users} = require('../models/articles')


const article_post = async(req,res)=>{
    const { body,title,snippet,userId} = req.body
   try{
       const articlePost = await Article.create({ body, title, snippet, userId })
       await Users.findByIdAndUpdate(userId, { $push: { post: articlePost._id } }, {new:true});
       res.status(201).json({articlePost})
   }catch(err){
    console.log('Error:',err.message)
       res.status(500).json({ error: err.message });
   }
}

const article_get = async(req,res)=>{
    const page=parseInt(req.query.page)||1;
    const limit =parseInt(req.query.limit)||4;
    const skip = (page - 1)*limit ;
    try {
        const totalDocs = await Article.countDocuments();
        const totalPage = Math.ceil(totalDocs/limit)
        const articles = await Article.find().sort({createdAt:-1}).skip(skip).limit(limit)
        res.status(200).json({
            articles,
            totalPage,
        });
    }catch(err){
        console.log('Error:', err.message)
        res.status(500).json({ error: err.message });
    }
}


const articleDetails_get=(req,res)=>{
    const id = req.params.id 
    Article.findById(id).populate('userId','username')
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Article not found" });
            }
            res.status(201).json(result)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: "Server error" });
        })
}

module.exports =({
article_post,
article_get,
articleDetails_get,
})
