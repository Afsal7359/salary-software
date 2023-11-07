const Post = require("../models/Post");

module.exports={
    GetPost:async(req,res)=>{
        try{
            const response= await Post.find()
            console.log("Post data get Successfully");
            res.status(200).json({
              success: true,
              message: "Post data get Successfully",
              data:response
            });
        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to Get Post.",
                error: err.message,
            });
        }
    },
    AddPost:async(req,res)=>{
        try{
            const data = req.body;
            const newPost = new Post(data)

            await newPost.save()

            console.log("Post Added Successfully");
          res.status(200).json({
            success: true,
            message: "Post added successfully.",
          });

        }catch(err){
            res.status(500).json({
                success: false,
                message: "Failed to add Post.",
                error: err.message,
            });
        }
    },
}