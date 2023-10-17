const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema ({
    team_name: {type: String, required: true},
    team_rank: {type: String, required: true}
})

module.exports = mongoose.model("Team", TeamSchema)