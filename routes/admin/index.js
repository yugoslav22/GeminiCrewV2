const express = require("express")
const router = express.Router()
const Category = require("../../models/Category")
const Post = require("../../models/Post")
const Daily = require("../../models/Daily")
const Team = require("../../models/Team")
const path = require("path")





//---------------------------------


router.get("/categories" , (req,res) => {

    Category.find({}).lean().sort({$natural:-1}).then(categories=>{
        res.render("admin/categories", {categories:categories})
    })
})



router.post("/categories" , (req,res) => {
    Category.create(req.body, (error,category)=>{
        if(!error){
            res.redirect("categories")
        }
    })
})


router.delete("/categories/:id" , (req,res) => {

    Category.deleteOne({_id: req.params.id}).then(()=>{
        res.redirect("/admin/categories")
    })
})


//-------------------------------------------------


router.get("/add_daily" , (req,res) => {
    res.render("admin/add_daily")
})

router.post("/daily_prog" , (req,res) => {
    let daily_image = req.files.daily_image
    daily_image.mv(path.resolve(__dirname, "../../public/img/dailyimages", daily_image.name))


    Daily.create({
        ...req.body,
        daily_image: `/img/dailyimages/${daily_image.name}`,
        
    },)
    req.session.sessionFlash={
        type: "alert alert-success",
        message: "Successfully done."
    }
    console.log(req.body)
    res.redirect("/admin/daily")
})

router.get("/daily",(req,res)=>{
    Daily.find({}).lean().then(daily =>{
        res.render("admin/daily",{daily:daily})
    })
})


//-----------------------------------

router.get("/posts" , (req,res) => {

   
    Post.find({}).lean().populate({path:"category",model:Category}).sort({$natural:-1}).then(posts => {
        
            res.render("admin/posts",{posts:posts})
        })
})


//-----------------------------------

router.get("/add_team" , (req,res) => {

    res.render("admin/add_team")
})


router.post("/team" , (req,res) => {
    // let daily_image = req.files.daily_image
    // daily_image.mv(path.resolve(__dirname, "../../public/img/dailyimages", daily_image.name))


    Team.create({
        ...req.body
        // daily_image: `/img/dailyimages/${daily_image.name}`,
        
    },)
    req.session.sessionFlash={
        type: "alert alert-success",
        message: "Successfully done."
    }
    console.log(req.body)
    res.redirect("/admin")
})


router.get("/",(req,res)=>{
    Team.find({}).lean().then(teams =>{
        res.render("admin/index",{teams:teams})
    })
})


// router.get("/" , (req,res) => {
    
//     res.render("admin/index")
// })
module.exports = router