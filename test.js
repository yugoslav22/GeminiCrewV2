const mongoose = require("mongoose")
const Post = require("./models/Post")


mongoose.connect("mongodb://127.0.0.1/geminiCrew_test_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

Post.create({
    title: "First post entry.",
    content: "This is the first content of post."
}, 
    (error,post) => {
    console.log(error,post)
})

Post.create({
    title: "second post entry.",
    content: "This is the second content of post."
}, 
    (error,post) => {
    console.log(error,post)
})