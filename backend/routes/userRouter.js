const express = require('express');
const bankmaster = require('../controller/bankmaster');
const Post = require('../controller/Post');
const router = express.Router();


router.get('/bankmaster',bankmaster.GetBankMaster);
router.post('/addbankmaster',bankmaster.AddBankMaster);

router.get('/post',Post.GetPost)
router.post('/addpost',Post.AddPost);

module.exports = router;
