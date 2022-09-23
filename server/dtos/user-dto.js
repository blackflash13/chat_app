module.exports = class UserDto {
    email;
    _id;
    name;
    isAdmin;
    newMessages;


    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.name = model.name;
        this.newMessages = model.newMessages;
        this.isAdmin = model.isAdmin;
    }
};
