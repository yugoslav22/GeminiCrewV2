const express = require('express')
var exphbs = require("express-handlebars")
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const generateDate = require("./helpers/generateDate").generateDate
const expressSession = require("express-session")
const connectMongo = require("connect-mongo")


mongoose.connect("mongodb://127.0.0.1/geminiCrew_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const mongoStore = connectMongo(expressSession)

app.use(expressSession({
  secret: "testooo",
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection })
  //store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1/geminiCrew_db"})

}))

app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})


app.use(fileUpload())


app.use(express.static("public"))


app.engine("handlebars", exphbs.engine({ helpers: { generateDate: generateDate } }))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  } else {
    res.locals = {
      displayLink: false
    }
  }
  next()

})


/*
const myMiddleware = (req,res,next) => {
  console.log("champ GS")
  next()
}

app.use("/", myMiddleware)
*/
const main = require("./routes/main")
const posts = require("./routes/posts")
const users = require("./routes/users")


app.use("/", main)
app.use("/posts", posts)
app.use("/users", users)








app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})






