const { Router } = require("express")
const { register, verify, login, refreshToken } = require("../controller/auth.controller")
const authValidateMiddleware = require("../middleware/auth.validate.middleware")

const authRouter = Router()

authRouter.post("/register", authValidateMiddleware, register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.get("/refresh", refreshToken)

module.exports = authRouter