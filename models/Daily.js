const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DailySchema = new mongoose.Schema ({
    daily_title: {type: String},
    daily_place: {type: String, required: true},
    daily_date: { type: String, required: true},
    daily_image: {type: String, required:true}
})


module.exports = mongoose.model("Daily", DailySchema)