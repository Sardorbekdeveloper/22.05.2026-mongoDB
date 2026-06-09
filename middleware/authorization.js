const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function authorization(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw CustomErrorHandler.BadRequest("Token not found");
        }

        const bearer = token.split(" ")[0];
        const partOfToken = token.split(" ")[1];

        if (bearer !== "Bearer" || !partOfToken) {
            throw CustomErrorHandler.BadRequest("Bearer not found");
        }

        // Tokenni tekshirish (Skrinshotdagi SEKRET_KEY muhit o'zgaruvchisidan olinmoqda)
        const decode = jwt.verify(partOfToken, process.env.SEKRET_KEY);
        req.user = decode;

        next();
    } catch (error) {
        next(error);
    }
};