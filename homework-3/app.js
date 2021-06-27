const express = require('express');

const userRouter = require('./routes/user.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('App has been started on port 5000...')
});
