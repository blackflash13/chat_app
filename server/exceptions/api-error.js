module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "Користувач не авторизований");
    }


    static NewFollowError() {
        return new ApiError(404, "Ви вже підписані на цього користувача");
    }

    static UnFollowError() {
        return new ApiError(404, "Ви не підписані на цього користувача!");
    }

    static TokenIsEmpty() {
        return new ApiError(404, "Токен відсутній");
    }

    static UserNotFound() {
        return new ApiError(404, "Такий користувач не зареєстрований в системі");
    }

    static BadEmailForOTP() {
        return new ApiError(404, "Bad email for find verify!");
    }

    static IncorrectOTPCode() {
        return new ApiError(404, "Невірний код");
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
};