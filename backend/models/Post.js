const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department', // This should be the model name that you want to reference
        required: true,
    },
    unit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit', // This should be the model name that you want to reference
        required: true,
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation', // This should be the model name that you want to reference
        required: true,
    },
    postid:{
        type: String,
        require:true,
        trim:true
    },
    isdeleted:{
        type:Boolean,
        require:true,
        default:false
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
