const userService = require("../services/user-service");
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");
const jwt = require("jsonwebtoken");


const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "24h",
    });
};

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return next(
                    ApiError.BadRequest("Помилка валідації даних", errors.array())
                );

            const {email, password, name} = req.body;
            const userData = await userService.registration(email, password, name);
            return res.json(userData);
        } catch (e) {
            return res.json(e.message);
            next(e.message);

        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty())
                return next(
                    ApiError.BadRequest("Помилка валідації даних", errors.array())
                );

            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            return res.json(userData);
        } catch (e) {
            return res.json(e.message);
            next(e.message);
        }
    }

    async verify(req, res, next) {
        try {
            const {email, code} = req.body;
            const user = await userService.verify(email, code);
            res.cookie("application_rf_token", user.refreshToken, {
                maxAge: 30 * 60 * 60 * 24,
                httpOnly: true,
            });
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {application_rf_token} = req.cookies;
            const token = await userService.logout(application_rf_token);
            res.clearCookie("application_rf_token");
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const user = await userService.userUpdate(req);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({token});
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {application_rf_token} = req.cookies;
            const userData = await userService.refresh(application_rf_token);
            res.cookie("application_rf_token", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            return res.json(await userService.delete(req.params.id));
        } catch (e) {
            next(e);
        }
    }

    async profile(req, res, next) {
        try {
            const info = await userService.getUser(req);
            return res.json(info);
        } catch (e) {
            next(e);
        }
    }

    async follow(req, res, next) {
        try {
            const user = await userService.follow(req.user._id, req.params.id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async unfollow(req, res, next) {
        try {
            const user = await userService.unfollow(req.user._id, req.params.id);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();