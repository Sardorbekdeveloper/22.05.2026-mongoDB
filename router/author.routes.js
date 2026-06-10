const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller");
const adminChecker = require("../middleware/admin-checker");
const multer = require("multer");
const path = require("path");

const authorRouter = Router()
const authorvalidatemiddleware = require("../middleware/author.validate.middleware");
const authorization = require("../middleware/authorization");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

authorRouter.get("/get_all_authors", authorization, getAllAuthors)
authorRouter.get("/get_one_author/:id", authorization, getOneAuthor)
authorRouter.post("/add_author", adminChecker, authorvalidatemiddleware, upload.single("upload_image"), addAuthor)
authorRouter.put("/update_author/:id", adminChecker, updateAuthor)
authorRouter.delete("/delete_author/:id", adminChecker, deleteAuthor)

module.exports = authorRouter