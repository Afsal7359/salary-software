const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({

    department:{
        type:String,
        require:true,
        trim:true
    },
    unit:{
        type:String,
        require:true,
        trim:true
    },
    designation:{
        type:String,
        require:true,
        trim:true
    }

})
const Post = mongoose.model('Post',PostSchema);
module.exports=Post