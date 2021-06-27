const { findAllUsers, findUserById, insertUser, deleteUserById, changeUserName } = require('../services/user.services')

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await findAllUsers();
        res.json(users);
    },

    getUserById: async (req, res) => {
        const user = await findUserById(+req.params.id);
        res.json(user);
    },

    createUser: async (req, res) => {
        await insertUser(req.body.userName);
        res.json('success');
    },

    deleteUser: async (req, res) => {
        await deleteUserById(+req.params.id)
        res.json('success');
    },

    updateUser: async (req, res) => {
        await changeUserName(+req.params.id, req.body.userName);
        res.json('success');
    }
}