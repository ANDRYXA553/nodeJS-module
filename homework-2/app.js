const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({defaultLayout: false}));
app.set('views', path.join(__dirname, 'public'));

const usersPath = path.join(__dirname, 'users.json');

function getUsers() {
    return JSON.parse(fs.readFileSync(usersPath).toString());
}

// HOME =======================
app.get('/', ((req, res) => {
    res.render('home');
}));

//REGISTRATION =======================
app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/users', (req, res) => {
    const users = getUsers();
    const {username, password} = req.body;

    const isUserAlreadyExist = users.some((user => user.username === username));

    if (!username || !password) {
        res.render('error', {
            error: 'Enter login and password',
            backUrl: '/users',
            text: 'Back to registration'
        });
        return;
    }
    if (isUserAlreadyExist) {
        res.render('error', {
            error: 'User with this name already exists',
            backUrl: '/users',
            text: 'Back to registration'
        });
        return;
    }

    const id = Date.now();

    users.push({id, username, password});
    fs.writeFile(usersPath, JSON.stringify(users), err => console.log(err));

    res.redirect(`/users/${id}`);
});

// LOGIN =======================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const users = getUsers();
    const {username, password} = req.body;

    const isUserExist = !(users.some(user => username === user.username));
    const isUserPasswordRight = users.some((user => user.username === username && user.password !== password));

    if (!username || !password) {
        res.render('error', {
            error: 'Enter your login and password',
            backUrl: '/login',
            text: 'Back'
        });
        return;
    }

    if (isUserExist) {
        res.render('error', {
            error: 'There is no user with this name',
            backUrl: '/users',
            text: 'Register'
        });
        return;
    }
    if (isUserPasswordRight) {
        res.render('error', {
            error: 'Invalid data entered',
            backUrl: '/login',
            text: 'Back'
        });
        return;
    }

    const user = users.find(user => (user.username === username) && (user.password === password));
    res.redirect(`/users/${user.id}`);
})

// USERS =======================
app.get('/users', (req, res) => {
    const users = getUsers();
    res.render('users', {users});
});

app.get('/users/:userId', (req, res) => {
    const users = getUsers();
    const user = users.find(user => user.id === +req.params.userId);

    res.render('user', {user});
});

app.listen(3000, () => {
    console.log('App listen 3000');
});

