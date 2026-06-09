const {Router} = require("express")
const { getAllAuthors, getOneAuthor, addAuthor, updateAuthor, deleteAuthor } = require("../controller/author.controller");
const adminChecker = require("../middleware/admin-checker");

const authorRouter = Router()
const authorvalidatemiddleware = require("../middleware/author.validate.middleware");
const authorization = require("../middleware/authorization");

authorRouter.get("/get_all_authors", authorization, getAllAuthors)
authorRouter.get("/get_one_author/:id", authorization, getOneAuthor)
authorRouter.post("/add_author", adminChecker, authorvalidatemiddleware, addAuthor)
authorRouter.put("/update_author/:id", adminChecker, updateAuthor)
authorRouter.delete("/delete_author/:id", adminChecker, deleteAuthor)

module.exports = authorRouter