const { userServices } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userServices.findAllUsers();
        res.json(users);
    },

    getUserById: async (req, res) => {
        res.json(req.user);
    },

    createUser: async (req, res) => {
        await userServices.insertUser(req.body.userName);
        res.json('success');
    },

    deleteUser: async (req, res) => {
        await userServices.deleteUserById(+req.params.id);
        res.json('success');
    },

    updateUser: async (req, res) => {
        await userServices.changeUserName(+req.params.id, req.body.userName);
        res.json('success');
    }
};