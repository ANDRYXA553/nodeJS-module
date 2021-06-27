const fs = require('fs');
const util = require('util');

const getUsers = util.promisify(fs.readFile);

const name = 'stepan'

getUsers('../dataBase/users.json').then(data =>{
    const users = JSON.parse(data.toString());
    users.push({name})
    fs.writeFile('../dataBase/users.json', JSON.stringify(users), err => console.log(err));
});



