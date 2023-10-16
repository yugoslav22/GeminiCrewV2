const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const Category = require("../models/Category")
const User = require("../models/User")


router.get("/" , (req,res) => {
    console.log(req.session)
    res.render("site/index")
})

/* router.get("/admin" , (req,res) => {

    res.render("admin/index")
}) */



router.get("/about" , (req,res) => {
    res.render("site/about")
})
/*
router.get("/blog" , (req,res) => {
    Post.find({}).then(posts =>{
        res.render("site/blog", {Post:posts})
    })
})
*/

router.get("/blog" , (req,res) => {
    Post.find({}).lean().populate({path:"author",model:User}).sort({$natural:-1}).then(posts => {
        Category.find({}).lean().then(categories =>{
            res.render("site/blog",{posts:posts,categories:categories})
        })
        
    })
})

router.get("/contact" , (req,res) => {
    res.render("./site/contact")
})
/*
router.get("/posts/new" , (req,res) => {
    res.render("site/addpost")
})

router.post("/posts/test", (req,res)=>{
    res.send("test ok")
})
*/

// router.get("/daily" , (req,res) => {
//     res.render("admin/daily")
// })


module.exports = router
