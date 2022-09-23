const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
    async registration(email, password, name) {
        const candidate = await UserModel.findOne({email});

        if (candidate)
            throw ApiError.BadRequest(
                `Користувач з електронною адресою ${email} вже зареєстрований на сайті!`
            );

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            email,
            name,
            password: hashPassword,
        });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken,
            tokens.accessToken
        );
        return {...userDto, userAppAccess: {...tokens}};
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});

        if (!user)
            throw ApiError.BadRequest(
                "Користувача з такою електронною адресою не знайдено!"
            );

        // const isPassEquals = await bcrypt.compare(password, user.password);
        // if (!isPassEquals) throw ApiError.BadRequest("Невірний пароль");

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(
            userDto.id,
            tokens.refreshToken,
            tokens.accessToken
        );

        user.status = 'online';
        await user.save();

        return {...userDto, userAppAccess: {...tokens}};
    }

    async logout(accessToken) {
        return await tokenService.removeToken(accessToken);
    }

    async userUpdate(req) {
        const user = await UserModel.findById(req.user._id);

        if (!user) throw ApiError.BadRequest(`User not found!!!`);

        const updates = ["email", "name", "about"];
        updates.forEach((property) => {
            if (req.body[property]) user[property] = req.body[property];
        });

        if (req.body.password)
            user["password"] = await bcrypt.hash(req.body.password, 10);

        await user.save();
        return user;
    }

    async getUser(req) {
        console.log(req.user)
        return UserModel.findOne({_id: req.user._id}, {});
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }


    async delete(id) {
        const user = await UserModel.findOne({_id: id});

        if (user) {
            await UserModel.deleteOne({_id: id});
            return {
                msg: "Користувача видалено",
                status: true,
            };
        }

        return {
            msg: "Такий користувач не зареєстрований в системі",
            status: false,
        };
    }

    async follow(myId, followId) {
        const currentFollowers = await UserModel.findById(followId, {followers: 1})    //фолловери того на кого підписуюсь

        if (!currentFollowers) throw ApiError.UserNotFound();

        const currentFollowing = await UserModel.findById(myId, {following: 1}) // мої фоллови

        if (currentFollowing.following.includes(followId)) {
            throw ApiError.NewFollowError();
        } else {
            currentFollowing.following.push(followId)
            currentFollowers.followers.push(myId)
            currentFollowers.save();
            return currentFollowing.save();
        }
    }


    async unfollow(myId, unFollowId) {
        const currentFollowers = await UserModel.findById(unFollowId, {followers: 1})    //фолловери того на кого підписуюсь

        if (!currentFollowers) throw ApiError.UserNotFound();

        const currentFollowing = await UserModel.findById(myId, {following: 1}) // мої фоллови

        const myFollowingIndex = currentFollowing.following.indexOf(unFollowId);


        if (myFollowingIndex > -1) {
            const FollowerIndex = currentFollowers.followers.indexOf(myId);
            if (FollowerIndex > -1) {
                currentFollowing.following.splice(myFollowingIndex, 1);
                currentFollowers.followers.splice(FollowerIndex, 1)

                currentFollowers.save();
                return currentFollowing.save();
            }
        } else {
            throw ApiError.UnFollowError();
        }

    }


}

module.exports = new UserService();