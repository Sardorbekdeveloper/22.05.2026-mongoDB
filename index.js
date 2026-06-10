const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require("./router/auth.routes")
const cookieParser = require("cookie-parser")
const path = require("path")

require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))

connectDB()

const uploadPath = path.join(__dirname, "..", "uploads", "images")
console.log(uploadPath);

// Router
app.use(authorRouter)
app.use(bookRouter)
app.use(authRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
})