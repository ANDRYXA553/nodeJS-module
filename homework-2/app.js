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

app.post('/registration', (req, res) => {
    const users = getUsers();
    const {username, password} = req.body;

    if (!username || !password) {
        res.render('error', {
            error: 'Введіть логін та пароль',
            backUrl: '/registration',
            text: 'Назад до реєстрації'
        });
        return;
    }
    if (users.some((user => user.username === username))) {
        res.render('error', {
            error: 'Користувач з таким імям уже існує',
            backUrl: '/registration',
            text: 'Назад до реєстрації'
        });
        return;
    }

    users.push({id: Date.now(), username, password});
    fs.writeFile(usersPath, JSON.stringify(users), err => console.log(err));

    const user = users.find(user => (user.username === username) && (user.password = password));
    res.redirect(`/users/${user.id}`);
});

// LOGIN =======================
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const users = getUsers();
    const {username, password} = req.body;

    if (!username || !password) {
        res.render('error', {
            error: 'Введіть логін та пароль',
            backUrl: '/login',
            text: 'Назад'
        });
        return;
    }

    if (!(users.some(user => username === user.username))) {
        res.render('error', {
            error: 'Користувача з таким імям не існує',
            backUrl: '/registration',
            text: 'Зареєструватись'
        });
        return;
    }
    if (users.some((user => user.username === username && user.password !== password))) {
        res.render('error', {
            error: 'Введено не коректні дані',
            backUrl: '/login',
            text: 'Назад'
        });
        return;
    }

    const user = users.find(user => (user.username === username) && (user.password = password));
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

