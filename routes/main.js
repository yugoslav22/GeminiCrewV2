const express = require("express")
const router = express.Router()
const Post = require("../models/Post")


router.get("/" , (req,res) => {
    console.log(req.session)
    res.render("site/index")
})

router.get("/admin" , (req,res) => {

    res.render("site/admin")
})



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
    Post.find({}).lean().then(posts => {
        res.render("site/blog",{posts:posts})
    })
})

router.get("/contact" , (req,res) => {
    res.render("./site/contact")
})


module.exports = router
