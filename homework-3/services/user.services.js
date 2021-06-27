const fs = require('fs');
const path = require('path');
const util = require('util');

const getUsers = util.promisify(fs.readFile);
const usersPath = path.join('/home', 'bohdan', 'WebstormProjects', 'nodeJS-module', 'homework-3', 'dataBase', 'users.json');

function getAllUsers(data) {
    return JSON.parse(data.toString());
}

module.exports = {
    findAllUsers: async () => {
        let users;

        await getUsers(usersPath).then(data => {
            users = getAllUsers(data);
        });

        return users;
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
            user = getAllUsers(data).find(user => user.id === userId);
            user.userName = newName;
        });

        return user;
    }
}