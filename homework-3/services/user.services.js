const fs = require('fs');
const path = require('path');
const util = require('util');

const { constants } = require('../constants');

const getUsers = util.promisify(fs.readFile);
const usersPath = path.join(__dirname, constants.DB_URL);

function getAllUsers(data) {
    return JSON.parse(data.toString());
}

module.exports = {
    findAllUsers: async () => {
        const users = await getUsers(usersPath);

        return JSON.parse(users.toString());
    },

    findUserById: async (userId) => {
        let user;

        await getUsers(usersPath).then(data => {
            user = getAllUsers(data).find(user => user.id === userId);
        });

        return user;
    },

    insertUser: async (userName) => {
        await getUsers(usersPath).then(data => {
            const users = getAllUsers(data);

            users.push({id: Date.now(), userName});

            fs.writeFile(usersPath, JSON.stringify(users), err => console.log(err));
        });
    },

    deleteUserById: async (userId) => {
        await getUsers(usersPath).then(data => {
            const users = getAllUsers(data);

            const newUsersArray = users.filter(user => user.id !== userId);

            fs.writeFile(usersPath, JSON.stringify(newUsersArray), err => console.log(err));
        });
    },

    changeUserName: async (userId, newName) => {
        let user;

        await getUsers(usersPath).then(data => {
            const users = getAllUsers(data);
            user = users.find(user => user.id === userId);
            user.userName = newName;
            fs.writeFile(usersPath, JSON.stringify(users), err => console.log(err));
        });

        return user;
    }
}