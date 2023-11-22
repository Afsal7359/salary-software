const express = require('express');
const postcontroller =require('../controller/Post')
const router = express.Router();


router.post('/addpost',postcontroller.AddPost);
router.put('/editpost/:id',postcontroller.EditPost);
router.delete('/deletepost/:id',postcontroller.DeletePost)
router.get('/getallpost',postcontroller.GetPost)
router.get('/getallpostcount',postcontroller.GetpostaccountCount)



module.exports = router;
