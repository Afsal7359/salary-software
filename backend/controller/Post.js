const Post = require("../models/Post");

module.exports={
    GetPost:async(req,res)=>{
        try{
            const response = await Post.find({ isdeleted: { $ne: true } }).sort({_id:-1})
            .populate('designation')
            .populate('department')
            .populate('unit');
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
        try {
            const { departmentId, unitId, designationId,postid } = req.body;
    
            // Create a new Post document with the provided departmentId, unitId, and designationId
            const newPost = new Post({
                department: departmentId,
                unit: unitId,
                designation: designationId,
                postid
            });
    
            await newPost.save();
             // Populate the fields and return the populated post
    const populatedPost = await Post.populate(newPost, [
        { path: 'department' },
        { path: 'unit' },
        { path: 'designation' },
      ]);
            res.status(200).json({
                success: true,
                message: "Post added successfully.",
                data: populatedPost,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to add Post.",
                error: err.message,
            });
        }
    },
    DeletePost: async (req, res) => {
        try {
          const {id } = req.params;
    
          // Check if an Employeetype with the specified employeeid exists
          const existingPost = await Post.findOne({_id:id });
    
          if (!existingPost) {
            return res.status(404).json({
              success: false,
              message: "Post not found.",
              
            });
          }
         
         
         // Soft delete by updating isdeleted field
      await Post.updateOne({ _id: id }, { $set: { isdeleted: true } });
          res.status(200).json({
            success: true,
            message: "Deleted successfully.",
          });
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "Failed to delete Post.",
            error: err.message,
          });
        }
      },
      EditPost: async (req, res) => {
        try {
            const {  departmentId, unitId, designationId } = req.body;
            const { id } = req.params;
    
            // Use updateOne directly on the model to update the document
            await Post.updateOne({ _id: id }, {
                
                department: departmentId,
                unit: unitId,
                designation:designationId
            });
    
            const populatedpost = await Post.findById(id)
            .populate([
              { path: 'department' },
              { path: 'unit' },
              { path: 'designation' },
            ]);
            res.status(200).json({
                success: true,
                message: "post master Edited successfully.",
                data: populatedpost,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to Edit post .",
                error: err.message,
            });
        }
    },
    GetpostaccountCount : async (req, res) => {
      try {
        const PostCount = await Post.countDocuments();
        
        res.status(200).json({
          success: true,
          message: "PostCount retrieved successfully.",
          data: { count: PostCount },
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
          success: false,
          message: "Internal server error.",
          error: error.message,
        });
      }
    }
    
}