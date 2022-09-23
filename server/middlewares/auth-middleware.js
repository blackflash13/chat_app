const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        if (!req.headers.authorization) throw ApiError.TokenIsEmpty();

        const token = req.headers.authorization.split(" ")[1];

        if (!token) throw ApiError.UnauthorizedError();

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json(e.message);
    }
};