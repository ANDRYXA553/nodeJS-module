const { userServices } = require('../services');

module.exports = {
    isUserExist: async (req, res, next) => {
        const usersById = await userServices.findUserById(+req.params.id);

        if(!usersById) {
            throw new Error('users does not exist');
        }

        req.user = usersById;

        next();
    },

    isDataCorrect: (req, res, next) => {
        if(!req.body.userName) {
            throw new Error('enter userNAme');
        }

        next();
    },

    isUserAlreadyExist: async (req, res, next) => {
        const users = await userServices.findAllUsers();

        const isUserExist = users.some(user => user.userName === req.body.userName);

        if(isUserExist) {
            throw new Error('users with this username already exist');
        }

        next();
    }
};